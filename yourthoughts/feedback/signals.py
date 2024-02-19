from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.utils import timezone
from .models import AcademicYear

@receiver(post_migrate)
def create_academic_year(sender, **kwargs):
    now = timezone.now()
    year = now.year if now.month > 7 else now.year - 1
    AcademicYear.objects.get_or_create(year=year)
