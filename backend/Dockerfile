# todos-backend
from python:3 
workdir /app
copy requirements.txt .
run pip install -r requirements.txt
copy . . 
expose 8000
cmd ./manage.py runserver 0.0.0.0:8000
