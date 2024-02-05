from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator, validate_email

class Student(models.Model):
    student = models.OneToOneField(User, on_delete=models.CASCADE)
    # email = models.EmailField(max_length=255, validators=[validate_email], unique=True)

class AcademicYear(models.Model):
    year = models.CharField(max_length=15)

class Module(models.Model):
    code = models.CharField(max_length=8, unique=True)
    title = models.CharField(max_length=50)

class Feedback(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True, blank=True)
    academicYear = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    materialRating = models.FloatField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    materialFeedback = models.CharField(max_length=500, null=True, blank=True)
    lecturerRating = models.FloatField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    lecturerFeedback = models.CharField(max_length=500, null=True, blank=True)
    submitDate = models.DateTimeField(auto_now_add=True)

    # questions_questionId = models.IntegerField()
    # feedbackId = models.IntegerField()

    # id = models.AutoField(primary_key=True)

    # username = models.CharField(max_length=255)
    # firstName = models.CharField(max_length=255)
    # lastName = models.CharField(max_length=255)

    # class Admin(WebUser):
    #     username = models.CharField(max_length=255)

    # class Student(models.Model):
    #     # id = models.AutoField(primary_key=True)
    #     module = models.CharField(max_length=255)

# class Survey(models.Model):
#     module = models.CharField(max_length=20)
#     #pub_date = models.DateTimeField(auto_now_add=True)
#
#     def __str__(self):
#         return self.module
#
# class Question(models.Model):
#     # feedback = models.ManyToManyField(FeedbackForm, through=SurveyQuestion)
#     text = models.CharField(max_length=200)
#     pub_date = models.DateTimeField(auto_now_add=True)
#
#     def __str__(self):
#         return self.text
#
# class SurveyQuestion(models.Model):
#     feedback = models.ForeignKey(Survey, on_delete=models.CASCADE)
#     question = models.ForeignKey(Question, on_delete=models.CASCADE)
#
# # Update the ManyToManyField in Question model after defining SurveyQuestion
# Question.feedback = models.ManyToManyField(Survey, through=SurveyQuestion)
#
#
# class Submission(models.Model):
#     feedback = models.ForeignKey(Survey, on_delete=models.PROTECT)
#     question = models.ForeignKey(Question, on_delete=models.PROTECT)
#     rating = models.FloatField(default=0, validators=[MaxValueValidator(5)])
#     feedback = models.CharField(max_length=200, null=True)
#     submit_date = models.DateTimeField(auto_now_add=True)
#     # participant_email = models.EmailField(max_length=255)
#
#     def __str__(self):
#         return self.feedback

# class Submission(models.Model):
#     feedback = models.ForeignKey(FeedbackForm, on_delete=models.PROTECT)
#     #participant_email = models.EmailField(max_length=255)
#     answer = models.ManyToManyField(Choice)
#     #status = models.CharField(max_length=255)x
