from django.http import JsonResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from . import models
from .serializers import AcademicYearSerializer, ModuleSerializer, AnonymousFeedbackSerializer, \
    AuthenticatedFeedbackSerializer, FeedbackSerializer, FeedbackListSerializer, AuthenticatedFeedbackSummarySerializer, \
    AnonymousFeedbackSummarySerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny

from .summarization import summarizer


class AcademicYearList(generics.ListAPIView):
    permission_classes = [AllowAny]
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


class SummarizeFeedbackView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, moduleCode, academicYear):
        try:
            feedbacks = models.Feedback.objects.filter(module__code=moduleCode, academicYear__year=academicYear)

            material_texts = " ".join([f.materialFeedback for f in feedbacks if f.materialFeedback])
            summary_material = summarizer(material_texts)

            if request.user.is_authenticated:
                lecturer_texts = " ".join([f.lecturerFeedback for f in feedbacks if f.lecturerFeedback])
                summary_lecturer = summarizer(lecturer_texts)
                serializer = AuthenticatedFeedbackSummarySerializer(data={
                    'module': moduleCode,
                    'academicYear': academicYear,
                    'summary_material': summary_material,
                    'summary_lecturer': summary_lecturer
                })
            else:
                serializer = AnonymousFeedbackSummarySerializer(data={
                    'module': moduleCode,
                    'academicYear': academicYear,
                    'summary_material': summary_material
                })

            if serializer.is_valid():
                return Response(serializer.validated_data)
            else:
                return Response(serializer.errors, status=400)

        except models.Module.DoesNotExist:
            return Response({"error": "Module not found"}, status=404)
        except models.AcademicYear.DoesNotExist:
            return Response({"error": "Academic year not found"}, status=404)


# class SummarizeFeedbackView(APIView):
#     permission_classes = [AllowAny]
#
#     def get(self, request, moduleCode, academicYear):
#         try:
#             feedbacks = models.Feedback.objects.filter(module__code=moduleCode, academicYear__year=academicYear)
#
#             # Combine all feedback texts for material and lecturer
#             material_texts = " ".join([f.materialFeedback for f in feedbacks])
#             lecturer_texts = " ".join([f.lecturerFeedback for f in feedbacks])
#
#             # Implement your summarization logic here
#             # For demonstration, just joining texts
#             summary_material = summarizer(material_texts)
#             summary_lecturer = summarizer(lecturer_texts)
#
#             data = {
#                 "module_code": moduleCode,
#                 "year": academicYear,
#                 "summary_material": summary_material,
#                 "summary_lecturer": summary_lecturer,
#             }
#
#             serializer = FeedbackSummarySerializer(data=data)
#             if serializer.is_valid():
#                 return Response(serializer.data)
#             else:
#                 return Response(serializer.errors, status=400)
#
#         except models.Module.DoesNotExist:
#             return Response({"error": "Module not found"}, status=404)
#         except models.AcademicYear.DoesNotExist:
#             return Response({"error": "Academic year not found"}, status=404)

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
