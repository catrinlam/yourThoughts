#!/bin/bash

# Wait for the database to be ready
python manage.py wait_for_db

# Apply database migrations
python manage.py makemigrations --settings=yourthoughts.production_settings
python manage.py migrate --settings=yourthoughts.production_settings

# Collect static files
python manage.py collectstatic --noinput --settings=yourthoughts.production_settings

# Start the Django server
exec python manage.py runserver 0.0.0.0:8000 --settings=yourthoughts.production_settings
