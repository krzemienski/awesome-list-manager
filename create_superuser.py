import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alm.settings')
django.setup()

User = get_user_model()
username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

if User.objects.filter(username=username).exists():
    print('Superuser already exists.')
else:
    User.objects.create_superuser(username=username, password=password)
    print('Superuser created.')
