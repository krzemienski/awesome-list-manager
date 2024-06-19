FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app
# Install dependencies
COPY . /app
RUN pip install --no-cache-dir -r /app/requirements.txt

# Use the wait-for-it script to wait for the database and then run the migrations and start the server
CMD ["sh", "-c", "python /app/manage.py migrate && python /app/create_superuser.py && gunicorn --bind 0.0.0.0:8000 alm.wsgi:application"]
