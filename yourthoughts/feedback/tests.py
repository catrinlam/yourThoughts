from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APIClient
from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import Student, Feedback, AcademicYear, Module

class StudentTestCase(TestCase):
    def setUp(self):
        student = User.objects.create_user(username="student", email="student@email.com", password="password")
        Student.objects.create(student=student)

    def test_student(self):
        student = Student.objects.get(student__email="student@email.com")
        self.assertEqual(student.student.email, 'student@email.com')
        self.assertTrue(student.student.check_password('password'))


class AcademicYearModelTestCase(TestCase):
    def setUp(self):
        self.academic_year = AcademicYear.objects.create(year="2022-2023")

    def test_academic_year_year(self):
        self.assertEqual(self.academic_year.year, '2022-2023')

class ModuleModelTestCase(TestCase):
    def setUp(self):
        self.module = Module.objects.create(code="TEST1234", title="Test Module")

    def test_module_code(self):
        self.assertEqual(self.module.code, "TEST1234")

    def test_module_title(self):
        self.assertEqual(self.module.title, "Test Module")

class FeedbackModelTestCase(TestCase):
    def setUp(self):
        student = User.objects.create_user(username="student", email="student@email.com", password="password")
        self.student = Student.objects.create(student=student)
        self.academic_year = AcademicYear.objects.create(year="2022-2023")
        self.module = Module.objects.create(code="TEST1234", title="Test Module")
        self.feedback = Feedback.objects.create(
            student=self.student,
            academicYear=self.academic_year,
            module=self.module,
            materialQuestion="How is the material?",
            lecturerQuestion="How is the lecturer?",
            materialRating=4.5,
            lecturerRating=4.0,
        )

    def test_feedback_material_rating(self):
        self.assertEqual(self.feedback.materialRating, 4.5)

    def test_feedback_lecturer_rating(self):
        self.assertEqual(self.feedback.lecturerRating, 4.0)

    def test_feedback_material_question_max_length(self):
        max_length = self.feedback._meta.get_field("materialQuestion").max_length
        self.assertLessEqual(len(self.feedback.materialQuestion), max_length)

    def test_feedback_lecturer_question_max_length(self):
        max_length = self.feedback._meta.get_field("lecturerQuestion").max_length
        self.assertLessEqual(len(self.feedback.lecturerQuestion), max_length)

    def test_feedback_material_feedback_max_length(self):
        max_length = self.feedback._meta.get_field("materialFeedback").max_length
        feedback_text = "a" * (max_length + 1)  # Exceed max length
        with self.assertRaises(ValidationError):
            self.feedback.materialFeedback = feedback_text
            self.feedback.full_clean()

    def test_feedback_lecturer_feedback_max_length(self):
        max_length = self.feedback._meta.get_field("lecturerFeedback").max_length
        feedback_text = "a" * (max_length + 1)  # Exceed max length
        with self.assertRaises(ValidationError):
            self.feedback.lecturerFeedback = feedback_text
            self.feedback.full_clean()

    def test_feedback_material_rating_range(self):
        self.feedback.materialRating = 6.0  # Exceeds max value (5)
        with self.assertRaises(ValidationError):
            self.feedback.full_clean()

    def test_feedback_lecturer_rating_range(self):
        self.feedback.lecturerRating = -1.0  # Below min value (0)
        with self.assertRaises(ValidationError):
            self.feedback.full_clean()

    def test_feedback_submit_date_auto_now_add(self):
        self.assertIsNotNone(self.feedback.submitDate)

class ViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        student = User.objects.create_user(username="student", email="student@email.com", password="password")
        self.student = Student.objects.create(student=student)
        self.client.force_authenticate(user=student)
        self.academic_year = AcademicYear.objects.create(year="2022-2023")
        self.module = Module.objects.create(code="TEST1234", title="Test Module")
        Feedback.objects.create(
            student=self.student,
            academicYear=self.academic_year,
            module=self.module,
            materialQuestion="How is the material?",
            lecturerQuestion="How is the lecturer?",
            materialRating=4.5,
            lecturerRating=4.0,
            materialFeedback="material is Good",
            lecturerFeedback="feedback is Good"
        )

    def test_module_list(self):
        response = self.client.get(reverse('moduleList'))
        self.assertEqual(response.status_code, 200)

    def test_feedback_list_anonymous(self):
        self.client.logout()
        Feedback.objects.create(
            student=self.student,
            academicYear=self.academic_year,
            module=self.module,
            materialQuestion="How is the material?",
            lecturerQuestion="How is the lecturer?",
            materialRating=4.5,
            lecturerRating=4.0,
            materialFeedback="material is Good",
            lecturerFeedback="feedback is Good"
        )
        response = self.client.get(reverse('feedbackList', kwargs={'moduleCode': self.module.code}))
        self.assertEqual(response.status_code, 200)
        for feedback in response.data:
            self.assertTrue('lecturerRating' not in feedback)
            self.assertTrue('lecturerFeedback' not in feedback)

    def test_feedback_list(self):
        response = self.client.get(reverse('feedbackList', kwargs={'moduleCode': self.module.code}))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), Feedback.objects.filter(module=self.module).count())

    def test_feedback_create(self):
        data = {
            "student": self.student.id,
            "academicYear": self.academic_year.id,
            "module": self.module.id,
            "materialQuestion": "How is the material?",
            "lecturerQuestion": "How is the lecturer?",
            "materialRating": 4.5,
            "lecturerRating": 4.0,
            "materialFeedback": "material is Good",
            "lecturerFeedback": "feedback is Good"
        }
        response = self.client.post(reverse('newfeedback'), data=data)
        self.assertEqual(response.status_code, 201)
