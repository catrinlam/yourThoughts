from django.test import TestCase

# Create your tests here.

from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from django.urls import reverse
from feedback.models import Student

class AccountTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        user = User.objects.create_user(username='testuser', email="student@email.com", password='testpass')
        self.student = Student.objects.create(student=user)

    def test_signup_view(self):
        response = self.client.post(reverse('signup'),
                                    {'student': {'username': 'student1', 'email': 'test2@example.com', 'password': 'testpass2'}}, format='json')  # Changed from 'user' to 'student'
        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(Student.objects.count(), 2)
        self.assertEqual(User.objects.get(email='test2@example.com').username, 'test2@example.com')

    def test_login_view(self):
        response = self.client.post(reverse('login'), {'email': 'student@email.com', 'password': 'testpass'}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual('token' in response.data, True)


# class AccountTests(APITestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.user = User.objects.create_user(username='testuser', email="student@email.com", password='testpass')
#         self.student = Student.objects.create(student=self.user)
#
#     def test_signup_view(self):
#         response = self.client.post(reverse('signup'),
#                                     {'user': {'email': 'test2@example.com', 'password': 'testpass2'}}, format='json')
#         self.assertEqual(response.status_code, 201)
#         self.assertEqual(User.objects.count(), 2)
#         self.assertEqual(Student.objects.count(), 2)
#         self.assertEqual(User.objects.get(email='test2@example.com').username, 'test2@example.com')
#
#     def test_login_view(self):
#         response = self.client.post(reverse('login'), {'email': 'testuser', 'password': 'testpass'}, format='json')
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual('token' in response.data, True)

    # def test_signup_view(self):
    #     response = self.client.post(reverse('signup'), {'email': 'test2@example.com', 'password': 'testpass2'}, format='json')
    #     self.assertEqual(response.status_code, 201)
    #     self.assertEqual(User.objects.count(), 2)
    #     self.assertEqual(Student.objects.count(), 2)
    #     self.assertEqual(User.objects.get(email='test2@example.com').username, 'test2@example.com')
    #
    # def test_login_view(self):
    #     response = self.client.post(reverse('login'), {'email': 'testuser', 'password': 'testpass'}, format='json')
    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual('token' in response.data, True)
