from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Student, AcademicYear, Feedback, Module


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']


class StudentSerializer(serializers.ModelSerializer):
    student = UserSerializer()

    class Meta:
        model = Student
        fields = ['id', 'student']

    def create(self, validated_data):
        student_data = validated_data.pop('student')
        student = User.objects.create(**student_data)
        return Student.objects.create(student=student, **validated_data)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


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

# class WebUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.WebUser
#         fields = ['id', 'email', 'password']

# class StudentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Student
#         fields = ['id', 'email', 'password']

# class StudentSerializer(serializers.ModelSerializer):
#     user = UserSerializer()
#
#     class Meta:
#         model = Student
#         fields = ['id', 'user']
#
#     def create(self, validated_data):
#         user_data = validated_data.pop('user')
#         user = User.objects.create(**user_data)
#         student = Student.objects.create(user=user, **validated_data)
#         return student

# class SurveySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Survey
#         fields = ['id', 'module']
#
# class QuestionSerializer(serializers.ModelSerializer):
#     feedback = serializers.StringRelatedField(many=True)
#     class Meta:
#         model = models.Question
#         fields = ['id', 'feedback', 'text', 'pub_date']
#
# class SurveyQuestionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.SurveyQuestion
#         fields = ['id', 'feedback', 'question']
#
# class SubmissionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Submission
#         fields = ['id', 'feedback', 'question', 'rating', 'feedback', 'submit_date']
