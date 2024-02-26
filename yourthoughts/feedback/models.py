from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator, validate_email

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

class AcademicYear(models.Model):
    year = models.PositiveIntegerField(validators=[MinValueValidator(2010), MaxValueValidator(2040)])

class Module(models.Model):
    code = models.CharField(max_length=8, unique=True)
    title = models.CharField(max_length=70)

class Feedback(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, blank=True)
    academicYear = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    materialRating = models.FloatField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    materialFeedback = models.CharField(max_length=500, null=True, blank=True)
    lecturerRating = models.FloatField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    lecturerFeedback = models.CharField(max_length=500, null=True, blank=True)
    submitDate = models.DateTimeField(auto_now_add=True)