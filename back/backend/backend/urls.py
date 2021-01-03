from django.contrib import admin
from django.urls import path, include
from .views import NineView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', include('api.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),

    path('nine/', NineView.as_view()),
]
