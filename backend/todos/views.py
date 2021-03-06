from django.shortcuts import render
from django.http.response import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
import os
from random import random

from .models import Todo


class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"


@api_view(["get"])
def stub(request: Request):
    """docstring for stub"""
    todos = [Todo(text=s, done=random() > 0.5) for s in os.listdir("/")]
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)


class TodoViewSet(ModelViewSet):

    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    class Meta:
        model = Todo


def echo(request):
    return HttpResponse("hello world")
