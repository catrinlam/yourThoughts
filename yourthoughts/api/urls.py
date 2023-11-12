from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<str:module_wanted>/', views.survey, name='survey'),
    path('<int:question_id>/results/', views.results, name='results'),

]