from django.db import models
from django.utils import timezone
from django.core.validators import MaxValueValidator, validate_email


# Create your models here.

class Student(models.Model):
    # id = models.AutoField(primary_key=True)
    email = models.EmailField(validators=[validate_email])
    # username = models.CharField(max_length=255)
    # firstName = models.CharField(max_length=255)
    # lastName = models.CharField(max_length=255)
    password = models.CharField(max_length=255)


# class Admin(WebUser):
#     username = models.CharField(max_length=255)


# class Student(models.Model):
#     # id = models.AutoField(primary_key=True)
#     module = models.CharField(max_length=255)


class AcademicYear(models.Model):
    year = models.CharField(max_length=15)


class Feedback(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    academicYear = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    # feedbackId = models.IntegerField()
    moduleName = models.CharField(max_length=50)
    materialQuestion = models.CharField(max_length=200)
    lecturerQuestion = models.CharField(max_length=200)
    # questions_questionId = models.IntegerField()
    materialRating = models.FloatField(default=0, validators=[MaxValueValidator(5)])
    materialFeedback = models.CharField(max_length=500, null=True)
    lecturerRating = models.FloatField(default=0, validators=[MaxValueValidator(5)])
    lecturerFeedback = models.CharField(max_length=500, null=True)
    submitDate = models.DateTimeField(auto_now_add=True)

# class Survey(models.Model):
#     module = models.CharField(max_length=20)
#     #pub_date = models.DateTimeField(auto_now_add=True)
#
#     def __str__(self):
#         return self.module
#
# class Question(models.Model):
#     # survey = models.ManyToManyField(SurveyForm, through=SurveyQuestion)
#     text = models.CharField(max_length=200)
#     pub_date = models.DateTimeField(auto_now_add=True)
#
#     def __str__(self):
#         return self.text
#
# class SurveyQuestion(models.Model):
#     survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
#     question = models.ForeignKey(Question, on_delete=models.CASCADE)
#
# # Update the ManyToManyField in Question model after defining SurveyQuestion
# Question.survey = models.ManyToManyField(Survey, through=SurveyQuestion)
#
#
# class Submission(models.Model):
#     survey = models.ForeignKey(Survey, on_delete=models.PROTECT)
#     question = models.ForeignKey(Question, on_delete=models.PROTECT)
#     rating = models.FloatField(default=0, validators=[MaxValueValidator(5)])
#     feedback = models.CharField(max_length=200, null=True)
#     submit_date = models.DateTimeField(auto_now_add=True)
#     # participant_email = models.EmailField(max_length=255)
#
#     def __str__(self):
#         return self.feedback

# class Submission(models.Model):
#     survey = models.ForeignKey(SurveyForm, on_delete=models.PROTECT)
#     #participant_email = models.EmailField(max_length=255)
#     answer = models.ManyToManyField(Choice)
#     #status = models.CharField(max_length=255)x
