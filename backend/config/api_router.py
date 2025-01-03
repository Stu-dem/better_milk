from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

from backend.users.api.views import UserViewSet
from backend.users.api.views import AuthUtilsViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)
router.register("authutils", AuthUtilsViewSet, basename="authutils")


app_name = "api"
urlpatterns = router.urls
