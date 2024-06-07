FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install dependencies
COPY requirements.txt /app/
RUN apt-get update && apt-get install -y netcat-openbsd
RUN pip install -r /app/requirements.txt

# Copy project
COPY . /app/
WORKDIR /app

# Ensure the wait-for-it script is copied and executable
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Use the wait-for-it script to wait for the database and then run the migrations and start the server
CMD ["/wait-for-it.sh", "db", "--", "sh", "-c", "python manage.py migrate && python create_superuser.py && gunicorn --bind 0.0.0.0:8000 alm.wsgi:application"]
