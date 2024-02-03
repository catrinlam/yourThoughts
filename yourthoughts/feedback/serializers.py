from rest_framework import serializers
from .models import Student, AcademicYear, Feedback, Module


# class WebUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.WebUser
#         fields = ['id', 'email', 'password']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'email', 'password']


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
        fields = ['academicYear', 'module', 'materialQuestion', 'materialRating', 'materialFeedback']

class AuthenticatedFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['academicYear', 'module', 'materialQuestion', 'lecturerQuestion',
                  'materialRating', 'materialFeedback', 'lecturerRating', 'lecturerFeedback', 'submitDate']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'student', 'academicYear', 'moduleTitle', 'materialQuestion', 'lecturerQuestion',
                  'materialRating', 'materialFeedback', 'lecturerRating', 'lecturerFeedback', 'submitDate']

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
