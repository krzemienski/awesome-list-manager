FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install dependencies
COPY requirements.txt /app/
RUN pip install -r /app/requirements.txt

# Copy project
COPY . /app/
WORKDIR /app

# Run migrations and create superuser
RUN python manage.py migrate
RUN python create_superuser.py

# Start server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "alm.wsgi:application"]
