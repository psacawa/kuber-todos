from python:3 
workdir /app
copy requirements.txt .
run pip install -r requirements.txt
copy . . 
cmd ./manage.py runserver 0.0.0.0:8000
