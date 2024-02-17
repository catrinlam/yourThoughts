from django.urls import path

from . import views

urlpatterns = [
    path('modules/', views.ModuleList.as_view(), name='moduleList'),
    path('newfeedback/', views.CreateFeedback.as_view(), name='newfeedback'),
    path('newmodule/', views.CreateModule.as_view(), name='newmodule'),
    path('deletemodule/<int:pk>/', views.DeleteModule.as_view(), name='deletemodule'),
    path('<str:moduleCode>/', views.FeedbackList.as_view(), name='feedbackList'),
]
