from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from feedback.models import AcademicYear, Module, Feedback, Student
from rest_framework.test import APIClient
from django.db.utils import IntegrityError

class ViewTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Setup data for the whole TestCase
        cls.user = User.objects.create_user('testuser', 'test@example.com', 'testpassword')
        cls.student = Student.objects.create(user=cls.user)
        cls.academic_year = AcademicYear.objects.create(year=2024)
        cls.module = Module.objects.create(code='MOD001', title='Test Module', lecturersNames='Dr. Test')
        Feedback.objects.create(
            student=cls.student,
            academicYear=cls.academic_year,
            module=cls.module,
            materialRating=4.5,
            lecturerRating=3.5,
            materialFeedback="Good material.",
            lecturerFeedback="Great lecturer."
        )

        cls.client = APIClient()

    def setUp(self):
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_academic_year_list(self):
        response = self.client.get(reverse('academicYearList'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_create_duplicate_academic_year(self):
        with self.assertRaises(IntegrityError):
            AcademicYear.objects.create(year=2023)

    def test_module_list(self):
        response = self.client.get(reverse('moduleList'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_module_feedback_authenticated(self):
        response = self.client.get(reverse('moduleFeedbacks', kwargs={'moduleCode': self.module.code}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        for feedback in response.data:
            self.assertIn('materialRating', feedback)
            self.assertIn('lecturerRating', feedback)

    def test_module_feedback_unauthenticated(self):
        self.client.logout()
        response = self.client.get(reverse('moduleFeedbacks', kwargs={'moduleCode': self.module.code}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        for feedback in response.data:
            self.assertIn('materialRating', feedback)
            self.assertNotIn('lecturerRating', feedback)

    def test_create_feedback(self):
        feedback_data = {
            "student": self.student.id,
            "academicYear": self.academic_year.id,
            "module": self.module.id,
            "materialFeedback": "Good",
        }
        response = self.client.post(reverse('newfeedback'), feedback_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class AdminViewsTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create an admin user
        cls.admin_user = User.objects.create_superuser('admin', 'admin@example.com', 'adminpass')

        # Create a regular user
        cls.regular_user = User.objects.create_user('user', 'user@example.com', 'userpass')

        cls.regular_student = Student.objects.create(user=cls.regular_user)
        cls.academic_year = AcademicYear.objects.create(year=2024)
        cls.module = Module.objects.create(code='MOD001', title='Test Module', lecturersNames='Dr. Test')
        cls.feedback = Feedback.objects.create(student=cls.regular_student,
                                               academicYear=cls.academic_year,
                                               module=cls.module,
                                               materialRating=4.5)

        cls.client = APIClient()

    def authenticate(self, user):
        self.client = APIClient()
        self.client.force_authenticate(user=user)

    def test_create_academic_year_admin_only(self):
        self.authenticate(self.admin_user)
        response = self.client.post(reverse('newacademicyear'), {'year': 2025})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Try with non-admin user
        self.authenticate(self.regular_user)
        response = self.client.post(reverse('newacademicyear'), {'year': 2026})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_academic_year_admin_only(self):
        # Assuming an AcademicYear instance with id=1 exists
        self.authenticate(self.admin_user)
        response = self.client.delete(reverse('deleteacademicyear', kwargs={'pk': self.academic_year.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Non-admin user should not be able to delete
        self.authenticate(self.regular_user)
        response = self.client.delete(reverse('deleteacademicyear', kwargs={'pk': self.academic_year.pk}))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_edit_academic_year_admin_only(self):
        self.authenticate(self.admin_user)
        response = self.client.patch(reverse('editacademicyear', kwargs={'pk': self.academic_year.pk}), {'year': 2022})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.authenticate(self.regular_user)
        response = self.client.patch(reverse('editacademicyear', kwargs={'pk': self.academic_year.pk}), {'year': 2022})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_module_admin_only(self):
        self.authenticate(self.admin_user)
        response = self.client.post(reverse('newmodule'), {'code': 'MOD002', 'title': 'New Module'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.authenticate(self.regular_user)
        response = self.client.post(reverse('newmodule'), {'code': 'MOD003', 'title': 'Another Module'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_module_admin_only(self):
        self.authenticate(self.admin_user)
        response = self.client.delete(reverse('deletemodule', kwargs={'pk': self.module.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.authenticate(self.regular_user)
        response = self.client.delete(reverse('deletemodule', kwargs={'pk': self.module.pk}))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_edit_module_admin_only(self):
        self.authenticate(self.admin_user)
        response = self.client.patch(reverse('editmodule', kwargs={'pk': self.module.pk}), {'title': 'Updated Module'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.authenticate(self.regular_user)
        response = self.client.patch(reverse('editmodule', kwargs={'pk': self.module.pk}), {'title': 'Failed Update'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_feedback_list_admin_only(self):
        self.authenticate(self.admin_user)
        response = self.client.get(reverse('feedbackList'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.authenticate(self.regular_user)
        response = self.client.get(reverse('feedbackList'))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_feedback_admin_only(self):
        self.authenticate(self.admin_user)
        response = self.client.delete(reverse('deletefeedback', kwargs={'pk': self.feedback.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.authenticate(self.regular_user)
        response = self.client.delete(reverse('deletefeedback', kwargs={'pk': self.feedback.pk}))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)