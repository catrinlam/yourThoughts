from django.contrib import admin
from . import models

# Register your models here.

# class StudentAdmin(admin.ModelAdmin):
#     fields =

# class SurveyQuestionInline(admin.TabularInline):
#   model = models.SurveyQuestion
#   show_change_link = True

# class QuestionInline(admin.TabularInline):
#   model = models.Question
#   show_change_link = True

# class SubmissionInline(admin.TabularInline):
#   model = models.Submission

# class SurveyAdmin(admin.ModelAdmin):
#   inlines = [
#     SurveyQuestionInline
#   ]

# class QuestionAdmin(admin.ModelAdmin):
#   inlines = [
#     SubmissionInline
#   ]

# admin.site.register(models.WebUser)
admin.site.register(models.Student)
admin.site.register(models.AcademicYear)
admin.site.register(models.Feedback)

# admin.site.register(models.Survey, SurveyAdmin)
# admin.site.register(models.Question, QuestionAdmin)
# #admin.site.register(models.Choice)
# admin.site.register(models.Submission)