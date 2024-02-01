from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.decorators import api_view
from . import models
from . import serializers


# Create your views here.
class ModuleList(generics.ListAPIView):
    queryset = models.Feedback.objects.all()
    serializer_class = serializers.FeedbackSerializer
class FeedbackList(generics.ListAPIView):
    serializer_class = serializers.FeedbackSerializer

    def get_queryset(self):
        moduleName = self.kwargs['moduleName']
        return models.Feedback.objects.filter(moduleName=moduleName)

class Feedback(generics.CreateAPIView):
    queryset = models.Feedback.objects.all()
    serializer_class = serializers.FeedbackSerializer
    # lookup_field =

# class SurveyList(generics.ListCreateAPIView):
#     queryset = models.Survey.objects.all()
#     serializer_class = serializers.SurveySerializer
#
# class Survey(generics.RetrieveUpdateDestroyAPIView):
#     queryset = models.Survey.objects.all()
#     serializer_class = serializers.SurveySerializer
#
# class QuestionList(generics.ListCreateAPIView):
#     queryset = models.Question.objects.all()
#     serializer_class = serializers.QuestionSerializer
#
# class SubmissionList(generics.ListCreateAPIView):
#     queryset = models.Submission.objects.all()
#     serializer_class = serializers.SubmissionSerializer


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


# @api_view(['GET'])
# def index(request):
#     #survey_list = models.SurveyForm.objects.order_by('module')
#     #output = ', '.join([q.module for q in survey_list])
#     #return HttpResponse(output)
#     module_list = models.SurveyForm.objects.all()
#     #output = '\n'.join([q.module for q in module_list])
#     serializer = serializers.SurveySerializer(module_list, many=True)
#     return Response(serializer.data)
#
# #@api_view(['GET'])
# def feedback(request, module_wanted):
#     module_name = models.SurveyForm.objects.get(module=module_wanted)
#     serializer = serializers.SurveySerializer(module_name, many=False)
#     return Response(serializer.data)
#
# #@api_view(['GET'])
# def results(request, question_id):
#     responses = models.Submission.objects.all()
#     serializer = serializers.SubmissionSerializer(responses, many=True)
#     return Response(serializer.data)
#     # return render('hi',request)

# def feedback(request, survey_id):
#     return render('feedback',request)
#
# def results(request, survey_id):
#     return render('results',request)

# @api_view(['GET'])
# def getRoutes(request):
#
#     routes = [
#         {
#             'Endpoint': '/feedback/',
#             'method': 'GET',
#             'body': None,
#             'description': 'Returns an array of feedback'
#         },
#         {
#             'Endpoint': '/feedback/id',
#             'method': 'GET',
#             'body': None,
#             'description': 'Returns a single feedback object'
#         },
#     ]
#     return Response(routes)