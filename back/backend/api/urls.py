from django.conf.urls.static import static
from django.conf import settings
from .views import ProductViewSet
from rest_framework.routers import DefaultRouter



router = DefaultRouter()
router.register(r'api', ProductViewSet, basename='product')

urlpatterns = router.urls
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)