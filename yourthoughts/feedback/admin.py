from django.contrib import admin
from . import models

admin.site.register(models.Student)
admin.site.register(models.AcademicYear)
admin.site.register(models.Module)
admin.site.register(models.Feedback)
