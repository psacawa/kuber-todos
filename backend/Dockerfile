# todos-backend-image
from python:3.9
workdir /app
copy requirements.txt ./
# run --mount=type=cache,target=/root/.cache/pip pip install -r requirements.txt
run pip install -r requirements.txt
copy . . 
cmd python3 manage.py runserver 0.0.0.0:8000
