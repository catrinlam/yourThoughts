from rest_framework.serializers import ModelSerializer
from . import models
class SurveySerializer(ModelSerializer):
    class Meta:
        model = models.Survey
        fields = ['id', 'module']

class QuestionSerializer(ModelSerializer):
    class Meta:
        model = models.Question
        fields = ['id', 'survey', 'text', 'pub_date']

class SurveyQuestionSerializer(ModelSerializer):
    class Meta:
        model = models.SurveyQuestion
        fields = ['id', 'survey', 'question']

class SubmissionSerializer(ModelSerializer):
    class Meta:
        model = models.Submission
        fields = ['id', 'survey', 'question', 'rating', 'feedback', 'submit_date']