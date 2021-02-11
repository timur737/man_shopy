from django.contrib import admin
from django.urls import path, include
from api.views import LoginView, UserUpdateView, ChangePasswordView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', include('api.urls')),
    path('auth/', include('djoser.urls')),

    path('login/', LoginView.as_view()),
    path('update-profile/<int:pk>/', UserUpdateView.as_view()),
    path('change-password/<int:pk>/', ChangePasswordView.as_view())
]
