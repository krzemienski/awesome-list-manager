from django.contrib import admin
from .models import List, Link, Category

@admin.register(List)
class ListAdmin(admin.ModelAdmin):
    list_display = ['title', 'description']

@admin.register(Link)
class LinkAdmin(admin.ModelAdmin):
    list_display = ['url', 'description', 'category', 'list']

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']
