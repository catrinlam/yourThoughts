from django.db import models
from django.utils import timezone
from django.core.validators import MaxValueValidator

# Create your models here.

class Survey(models.Model):
    module = models.CharField(max_length=20)
    #pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.module

class Question(models.Model):
    # survey = models.ManyToManyField(SurveyForm, through=SurveyQuestion)
    text = models.CharField(max_length=200)
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text

class SurveyQuestion(models.Model):
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

# Update the ManyToManyField in Question model after defining SurveyQuestion
Question.survey = models.ManyToManyField(Survey, through=SurveyQuestion)


class Submission(models.Model):
    survey = models.ForeignKey(Survey, on_delete=models.PROTECT)
    question = models.ForeignKey(Question, on_delete=models.PROTECT)
    rating = models.FloatField(default=0, validators=[MaxValueValidator(5)])
    feedback = models.CharField(max_length=200, null=True)
    submit_date = models.DateTimeField(auto_now_add=True)
    # participant_email = models.EmailField(max_length=255)

    def __str__(self):
        return self.feedback

# class Submission(models.Model):
#     survey = models.ForeignKey(SurveyForm, on_delete=models.PROTECT)
#     #participant_email = models.EmailField(max_length=255)
#     answer = models.ManyToManyField(Choice)
#     #status = models.CharField(max_length=255)x