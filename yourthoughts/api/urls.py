from django.urls import path

from . import views

urlpatterns = [
    path('', views.SurveyList.as_view(), name='survey'),
    # path('<str:module>/', views.SurveyList.as_view(), name='survey'),
    path('api/results/', views.SubmissionList.as_view(), name='results'),

]