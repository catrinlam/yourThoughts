from rest_framework import serializers
from . import models
class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Survey
        fields = ['id', 'module']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Question
        fields = ['id', 'survey', 'text', 'pub_date']

class SurveyQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SurveyQuestion
        fields = ['id', 'survey', 'question']

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Submission
        fields = ['id', 'survey', 'question', 'rating', 'feedback', 'submit_date']