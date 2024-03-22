from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/', include('feedback.urls')),
    path('api/auth/', include('rest_framework.urls')),
    path('api/accounts/', include('accounts.urls')),
]
