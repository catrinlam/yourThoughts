from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Student, AcademicYear, Feedback, Module
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'is_staff']


class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Student
        fields = ['id', 'user']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        return Student.objects.create(user=user, **validated_data)

class ProfileSerializer(serializers.ModelSerializer):
    student = UserSerializer(many=False)
    class Meta:
        model = Student
        fields = ['id', 'student']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['is_staff'] = user.is_staff

        try:
            student = Student.objects.get(user=user)
            token['studentId'] = student.id
        except Student.DoesNotExist:
            pass
        return token


class AcademicYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicYear
        fields = ['id', 'year']


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = ['id', 'code', 'title']

class AnonymousFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['academicYear', 'module', 'materialRating', 'materialFeedback']


class AuthenticatedFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['academicYear', 'module',
                  'materialRating', 'materialFeedback', 'lecturerRating', 'lecturerFeedback', 'submitDate']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'student', 'academicYear', 'module',
                  'materialRating', 'materialFeedback', 'lecturerRating', 'lecturerFeedback', 'submitDate']

class FeedbackListSerializer(serializers.ModelSerializer):
    module = ModuleSerializer(read_only=True)
    academicYear = AcademicYearSerializer(read_only=True)
    class Meta:
        model = Feedback
        fields = ['id', 'student', 'academicYear', 'module',
                  'materialRating', 'materialFeedback', 'lecturerRating', 'lecturerFeedback', 'submitDate']
