from django.db import models
from django.contrib.auth.models import User

class AwesomeList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    github_url = models.URLField()
    content = models.TextField(null=True, blank=True)
    last_synced = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    awesome_list = models.ForeignKey(AwesomeList, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name_plural = 'categories'

class Link(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    url = models.URLField()
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']

class ValidationResult(models.Model):
    awesome_list = models.ForeignKey(AwesomeList, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    lint_success = models.BooleanField()
    lint_output = models.TextField()
    link_check_success = models.BooleanField()
    link_check_output = models.TextField()
