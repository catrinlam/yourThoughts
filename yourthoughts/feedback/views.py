from rest_framework import generics
from . import models
from .serializers import StudentSerializer, AcademicYearSerializer, ModuleSerializer, AnonymousFeedbackSerializer, AuthenticatedFeedbackSerializer, FeedbackSerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly

class ModuleList(generics.ListAPIView):
    queryset = models.Module.objects.all()
    serializer_class = ModuleSerializer
class FeedbackList(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = models.Feedback.objects.all()

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return AuthenticatedFeedbackSerializer
        return AnonymousFeedbackSerializer

    def get_queryset(self):
        moduleCode = self.kwargs['moduleCode']
        return models.Feedback.objects.filter(module__code=moduleCode)

class FeedbackForm(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = models.Feedback.objects.all()
    serializer_class = FeedbackSerializer
    # lookup_field =


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
#     #survey_list = models.FeedbackForm.objects.order_by('module')
#     #output = ', '.join([q.module for q in survey_list])
#     #return HttpResponse(output)
#     module_list = models.FeedbackForm.objects.all()
#     #output = '\n'.join([q.module for q in module_list])
#     serializer = serializers.SurveySerializer(module_list, many=True)
#     return Response(serializer.data)
#
# #@api_view(['GET'])
# def feedback(request, module_wanted):
#     module_name = models.FeedbackForm.objects.get(module=module_wanted)
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