#!/bin/bash

chmod +x wait-for-it.sh
# Wait for the database to be ready
./wait-for-it.sh db:5432 --timeout=30 -- echo "Database is up"

# Apply database migrations
python manage.py makemigrations --settings=yourthoughts.production_settings
python manage.py migrate --settings=yourthoughts.production_settings

# Collect static files
#python manage.py collectstatic --noinput --settings=yourthoughts.production_settings

# Start the Django server
exec python manage.py runserver 0.0.0.0:8000 --settings=yourthoughts.production_settings
