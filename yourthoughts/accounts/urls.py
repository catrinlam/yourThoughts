from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup/', views.SignUp.as_view(), name='signup'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', views.Profile.as_view(), name='profile'),
    path('users/', views.ListUsers.as_view(), name='users'),
    path('newuser/', views.CreateUser.as_view(), name='create_user'),
    # path('edituser/<int:pk>/', views.EditUser.as_view(), name='edit_user'),
    path('deleteuser/<int:pk>/', views.DeleteUser.as_view(), name='delete_user'),
]
