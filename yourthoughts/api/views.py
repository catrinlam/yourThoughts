from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from . import models
from . import serializers

# Create your views here.

@api_view(['GET'])
def index(request):
    #survey_list = models.Survey.objects.order_by('module')
    #output = ', '.join([q.module for q in survey_list])
    #return HttpResponse(output)
    module_list = models.Survey.objects.all()
    #output = '\n'.join([q.module for q in module_list])
    serializer = serializers.SurveySerializer(module_list, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def survey(request, module_wanted):
    module_name = models.Survey.objects.get(module=module_wanted)
    serializer = serializers.SurveySerializer(module_name, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def results(request, question_id):
    responses = models.Submission.objects.all()
    serializer = serializers.SubmissionSerializer(responses, many=True)
    return Response(serializer.data)
    # return render('hi',request)

# def survey(request, survey_id):
#     return render('survey',request)
#
# def results(request, survey_id):
#     return render('results',request)

# @api_view(['GET'])
# def getRoutes(request):
#
#     routes = [
#         {
#             'Endpoint': '/survey/',
#             'method': 'GET',
#             'body': None,
#             'description': 'Returns an array of survey'
#         },
#         {
#             'Endpoint': '/survey/id',
#             'method': 'GET',
#             'body': None,
#             'description': 'Returns a single survey object'
#         },
#     ]
#     return Response(routes)