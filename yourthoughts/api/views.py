from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.

def index(request):
    return HttpResponse("index")
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