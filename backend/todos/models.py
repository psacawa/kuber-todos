from django.db import models

class Todo(models.Model): 
    id = models.AutoField(primary_key=True)
    text = models.TextField(max_length=200)
    done = models.BooleanField(default=False)
