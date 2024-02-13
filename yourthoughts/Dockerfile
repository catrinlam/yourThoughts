# docker/backend/Dockerfile

FROM python:3.11.6

# set environment variables
ENV PYTHONUNBUFFERED=1

# Copy the entire project folder to the image /app folder
COPY . /app

# Make sure that /app is the working directory
WORKDIR /app

# Upgrade python package installer
RUN pip install --upgrade pip

# Install dependencies
RUN pip install -r requirements.txt

# Copy the entrypoint script and grant execution permissions
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Set the entrypoint script to be executed
ENTRYPOINT ["/app/entrypoint.sh"]

# Expose the port where the Django app runs
EXPOSE 8000
