from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class List(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title

class Link(models.Model):
    url = models.URLField()
    description = models.TextField(blank=True, null=True)
    category = models.ForeignKey(Category, related_name='links', on_delete=models.SET_NULL, null=True, blank=True)
    list = models.ForeignKey(List, related_name='links', on_delete=models.CASCADE)

    def __str__(self):
        return self.url
