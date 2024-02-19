from django.apps import AppConfig
from django.utils import timezone


class FeedbackConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'feedback'

    def ready(self):
        from .models import AcademicYear  # import your model here
        now = timezone.now()
        year = now.year if now.month > 7 else now.year - 1
        AcademicYear.objects.get_or_create(year=year)
