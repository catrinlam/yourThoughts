from django.urls import path

from . import views

urlpatterns = [
    path('modules/', views.ModuleList.as_view(), name='moduleList'),
    path('newfeedback/', views.FeedbackForm.as_view(), name='newfeedback'),
    path('<str:moduleCode>/', views.FeedbackList.as_view(), name='feedbackList'),
    # # path('<str:module>/', views.FeedbackList.as_view(), name='feedback'),
    # path('<int:pk>/', views.Survey.as_view(), name='feedback'),
    # path('question/', views.QuestionList.as_view(), name='questions'),
    # path('results/', views.SubmissionList.as_view(), name='results'),

]
