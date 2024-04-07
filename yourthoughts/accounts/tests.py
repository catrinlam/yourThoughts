from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from django.test import TestCase
from feedback.models import Student

class AccountViewsTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a user and admin user for testing
        cls.user = User.objects.create_user(username='user', email='user@example.com', password='userpassword')
        cls.admin_user = User.objects.create_superuser('admin', email='admin@example.com', password='adminpassword')
        cls.student = Student.objects.create(user=cls.user)

        cls.client = APIClient()

    def authenticate(self, user):
        self.client = APIClient()
        self.client.force_authenticate(user=user)

    def test_signup_view(self):
        response = self.client.post(reverse('signup'), {
            'user': {
                'username': 'newuser',
                'email': 'newuser@example.com',
                'password': 'newpassword'
            }
        }, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='newuser').exists())
        self.assertTrue(Student.objects.filter(user__username='newuser').exists())

    def test_token_generation(self):
        response = self.client.post(reverse('token_obtain_pair'), {
            'username': 'user',
            'password': 'userpassword'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_list_users_admin_only(self):
        self.authenticate(self.admin_user)
        response = self.client.get(reverse('users'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.authenticate(self.user)
        response = self.client.get(reverse('users'))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_user_admin_only(self):
        # Create a user to be deleted
        user_to_delete = User.objects.create_user(username='tobedeleted', email='tobedeleted@example.com',
                                                  password='deletepassword')
        student_to_delete = Student.objects.create(user=user_to_delete)

        self.authenticate(self.admin_user)
        response = self.client.delete(reverse('delete_user', kwargs={'pk': student_to_delete.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(User.objects.filter(username='tobedeleted').exists())

        # Attempt to delete with non-admin user should fail
        self.authenticate(self.user)
        response = self.client.delete(reverse('delete_user', kwargs={'pk': self.student.pk}))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
# from django.test import TestCase
#
# # Create your tests here.
#
# from django.contrib.auth.models import User
# from rest_framework.test import APITestCase, APIClient
# from rest_framework.authtoken.models import Token
# from django.urls import reverse
# from feedback.models import Student
#
# class AccountTests(APITestCase):
#     def setUp(self):
#         self.client = APIClient()
#         user = User.objects.create_user(username='testuser', email="student@email.com", password='testpass')
#         self.student = Student.objects.create(student=user)
#
#     def test_signup_view(self):
#         response = self.client.post(reverse('signup'),
#                                     {'student': {'username': 'student1', 'email': 'test2@example.com', 'password': 'testpass2'}}, format='json')  # Changed from 'user' to 'student'
#         self.assertEqual(response.status_code, 201)
#         self.assertEqual(User.objects.count(), 2)
#         self.assertEqual(Student.objects.count(), 2)
#         self.assertEqual(User.objects.get(email='test2@example.com').username, 'test2@example.com')
#
#     def test_login_view(self):
#         response = self.client.post(reverse('login'), {'email': 'student@email.com', 'password': 'testpass'}, format='json')
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual('token' in response.data, True)
#
#
# # class AccountTests(APITestCase):
# #     def setUp(self):
# #         self.client = APIClient()
# #         self.user = User.objects.create_user(username='testuser', email="student@email.com", password='testpass')
# #         self.student = Student.objects.create(student=self.user)
# #
# #     def test_signup_view(self):
# #         response = self.client.post(reverse('signup'),
# #                                     {'user': {'email': 'test2@example.com', 'password': 'testpass2'}}, format='json')
# #         self.assertEqual(response.status_code, 201)
# #         self.assertEqual(User.objects.count(), 2)
# #         self.assertEqual(Student.objects.count(), 2)
# #         self.assertEqual(User.objects.get(email='test2@example.com').username, 'test2@example.com')
# #
# #     def test_login_view(self):
# #         response = self.client.post(reverse('login'), {'email': 'testuser', 'password': 'testpass'}, format='json')
# #         self.assertEqual(response.status_code, 200)
# #         self.assertEqual('token' in response.data, True)
#
#     # def test_signup_view(self):
#     #     response = self.client.post(reverse('signup'), {'email': 'test2@example.com', 'password': 'testpass2'}, format='json')
#     #     self.assertEqual(response.status_code, 201)
#     #     self.assertEqual(User.objects.count(), 2)
#     #     self.assertEqual(Student.objects.count(), 2)
#     #     self.assertEqual(User.objects.get(email='test2@example.com').username, 'test2@example.com')
#     #
#     # def test_login_view(self):
#     #     response = self.client.post(reverse('login'), {'email': 'testuser', 'password': 'testpass'}, format='json')
#     #     self.assertEqual(response.status_code, 200)
#     #     self.assertEqual('token' in response.data, True)
