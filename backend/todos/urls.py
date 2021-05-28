from django.urls import re_path, include, path

from rest_framework.routers import SimpleRouter

from .views import TodoViewSet, echo

router = SimpleRouter()
router.register("todos", TodoViewSet, basename="todos")


urlpatterns = [path("", echo), re_path(r"^", include(router.urls))]
