from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.apps import apps
from feedback.models import Student, Module, AcademicYear, Feedback


class Command(BaseCommand):
    help = 'Deletes data if there is no feedback and user in the database'

    def handle(self, *args, **options):
        User = get_user_model()
        if not User.objects.exists() and not Feedback.objects.exists():
            # Delete the superuser
            User.objects.filter(is_superuser=True).delete()
            for model in apps.get_models():
                model.objects.all().delete()
            # models_to_clear = [Student, Module, AcademicYear, Feedback]
            # for model in models_to_clear:
            #     model.objects.all().delete()
            self.stdout.write(self.style.SUCCESS('Successfully deleted data'))
