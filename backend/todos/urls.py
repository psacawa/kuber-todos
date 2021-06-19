from django.urls import re_path, include, path

from rest_framework.routers import SimpleRouter

class MySimpleRouter(SimpleRouter): 
    def __init__(self):
        self.trailing_slash ="/?"
        super(SimpleRouter, self).__init__()

from .views import TodoViewSet, echo

router = MySimpleRouter()
router.register("todos", TodoViewSet, basename="todos")


urlpatterns = [path("", echo), re_path(r"^", include(router.urls))]
