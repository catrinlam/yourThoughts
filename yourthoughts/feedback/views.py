from rest_framework import generics
from . import models
from .serializers import AcademicYearSerializer, ModuleSerializer, AnonymousFeedbackSerializer, AuthenticatedFeedbackSerializer, FeedbackSerializer, FeedbackListSerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny

class AcademicYearList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = models.AcademicYear.objects.all()
    serializer_class = AcademicYearSerializer

class ModuleList(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = models.Module.objects.all()
    serializer_class = ModuleSerializer

class ModuleFeedback(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = models.Feedback.objects.all()

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return AuthenticatedFeedbackSerializer
        return AnonymousFeedbackSerializer

    def get_queryset(self):
        moduleCode = self.kwargs['moduleCode']
        return models.Feedback.objects.filter(module__code=moduleCode)

class CreateFeedback(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = models.Feedback.objects.all()
    serializer_class = FeedbackSerializer

"""Admin only views"""
class CreateAcademicYear(generics.CreateAPIView):
    permission_classes = [IsAdminUser]
    queryset = models.AcademicYear.objects.all()
    serializer_class = AcademicYearSerializer

class DeleteAcademicYear(generics.DestroyAPIView):
    permission_classes = [IsAdminUser]
    queryset = models.AcademicYear.objects.all()
    serializer_class = AcademicYearSerializer

class EditAcademicYear(generics.UpdateAPIView):
    permission_classes = [IsAdminUser]
    queryset = models.AcademicYear.objects.all()
    serializer_class = AcademicYearSerializer

class CreateModule(generics.CreateAPIView):
    permission_classes = [IsAdminUser]
    queryset = models.Module.objects.all()
    serializer_class = ModuleSerializer

class DeleteModule(generics.DestroyAPIView):
    permission_classes = [IsAdminUser]
    queryset = models.Module.objects.all()
    serializer_class = ModuleSerializer

class EditModule(generics.UpdateAPIView):
    permission_classes = [IsAdminUser]
    queryset = models.Module.objects.all()
    serializer_class = ModuleSerializer

class FeedbackList(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    queryset = models.Feedback.objects.all()
    serializer_class = FeedbackListSerializer

class DeleteFeedback(generics.DestroyAPIView):
    permission_classes = [IsAdminUser]
    queryset = models.Feedback.objects.all()
    serializer_class = FeedbackSerializer

""" Concrete View Classes
#CreateAPIView
Used for create-only endpoints.
#ListAPIView
Used for read-only endpoints to represent a collection of model instances.
#RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
#DestroyAPIView
Used for delete-only endpoints for a single model instance.
#UpdateAPIView
Used for update-only endpoints for a single model instance.
##ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
#RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
#RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""