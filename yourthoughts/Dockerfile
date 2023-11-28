# docker/backend/Dockerfile

FROM python:3.11.6

# set environment variables
ENV PYTHONUNBUFFERED=1

#Copy the entire project folder to image /app folder
COPY .  /app

#Make sure that /app is the working directory
WORKDIR  /app

## where your code lives
#WORKDIR .
#COPY .. .

#Upgrade python package installer
RUN pip install --upgrade pip

# install dependencies
RUN pip install -r requirements.txt

#COPY . ./

# start server
CMD python manage.py makemigrations --settings=yourthoughts.production_settings & python manage.py migrate --settings=yourthoughts.production_settings & python manage.py runserver 0.0.0.0:8000 --settings=yourthoughts.production_settings

# port where the Django app runs
EXPOSE 8000
