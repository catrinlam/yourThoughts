from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from . import models

# Create your views here.

def index(request):
    #survey_list = models.Survey.objects.order_by('module')
    #output = ', '.join([q.module for q in survey_list])
    #return HttpResponse(output)
    module_list = models.Survey.objects.all()
    output = '\n'.join([q.module for q in module_list])
    return HttpResponse(output)

def survey(request, module_wanted):
    module_id = models.Survey.objects.get(module=module_wanted)
    return HttpResponse("Module Survey %s." % module_id)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)
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