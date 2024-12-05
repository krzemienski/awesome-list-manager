from rest_framework import serializers
from .models import AwesomeList, Category, Link, ValidationResult

class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ['id', 'title', 'url', 'description', 'category', 'order']

class CategorySerializer(serializers.ModelSerializer):
    links = LinkSerializer(many=True, source='link_set', read_only=True)
    links_count = serializers.IntegerField(source='link_set.count', read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'parent', 'order', 'links', 'links_count']

class AwesomeListSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, source='category_set', read_only=True)
    categories_count = serializers.IntegerField(source='category_set.count', read_only=True)
    links_count = serializers.SerializerMethodField()

    class Meta:
        model = AwesomeList
        fields = ['id', 'name', 'github_url', 'last_synced', 'categories',
                 'categories_count', 'links_count']

    def get_links_count(self, obj):
        return Link.objects.filter(category__awesome_list=obj).count()
