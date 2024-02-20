from django.urls import path

from . import views

urlpatterns = [
    path('modules/', views.ModuleList.as_view(), name='moduleList'),
    path('academicyears/', views.AcademicYearList.as_view(), name='academicYearList'),
    path('newfeedback/', views.CreateFeedback.as_view(), name='newfeedback'),
    path('newyear/', views.CreateAcademicYear.as_view(), name='newacademicyear'),
    path('deleteyear/<int:pk>/', views.DeleteAcademicYear.as_view(), name='deleteacademicyear'),
    path('edityear/<int:pk>/', views.EditAcademicYear.as_view(), name='editacademicyear'),
    path('newmodule/', views.CreateModule.as_view(), name='newmodule'),
    path('deletemodule/<int:pk>/', views.DeleteModule.as_view(), name='deletemodule'),
    path('editmodule/<int:pk>/', views.EditModule.as_view(), name='editmodule'),
    path('feedbacks/', views.FeedbackList.as_view(), name='feedbackList'),
    path('deletefeedback/<int:pk>/', views.DeleteFeedback.as_view(), name='deletefeedback'),
    path('<str:moduleCode>/', views.ModuleFeedback.as_view(), name='feedbackList'),
]
