from django.urls import path

from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('users/', views.ListUsers.as_view(), name='users'),
    path('signup/', views.SignUpView.as_view(), name='signup'),
    # path('logout/', views.LogoutView.as_view(), name='logout'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    # path('login/', views.LoginView.as_view(), name='login'),
]
