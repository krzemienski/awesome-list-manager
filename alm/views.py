from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse
from .models import List, Link, Category
from .serializers import ListSerializer, LinkSerializer, CategorySerializer
import requests
import re
from bs4 import BeautifulSoup
import openai
import subprocess

class ListViewSet(viewsets.ModelViewSet):
    queryset = List.objects.all()
    serializer_class = ListSerializer

class LinkViewSet(viewsets.ModelViewSet):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

@api_view(['POST'])
def upload_readme(request):
    if 'file' in request.FILES:
        file = request.FILES['file']
        content = file.read().decode('utf-8')
    elif 'url' in request.data:
        response = requests.get(request.data['url'])
        content = response.text
    else:
        return JsonResponse({"error": "No file or URL provided"}, status=400)

    categories = parse_markdown(content)

    for category_name, links in categories.items():
        category, created = Category.objects.get_or_create(name=category_name)
        list_obj, created = List.objects.get_or_create(title=category_name, description=category_name)

        for link in links:
            Link.objects.get_or_create(
                url=link['url'],
                defaults={
                    'description': link['description'],
                    'category': category,
                    'list': list_obj
                }
            )

    return JsonResponse({"status": "success"}, status=200)

def parse_markdown(markdown_content):
    header_pattern = re.compile(r'^### (.+)', re.MULTILINE)
    link_pattern = re.compile(r'- \[(.+?)\]\((http.+?)\)\s+- (.+)', re.MULTILINE)

    categories = {}
    current_category = None

    for line in markdown_content.split('\n'):
        header_match = header_pattern.match(line)
        link_match = link_pattern.match(line)

        if header_match:
            current_category = header_match.group(1).strip()
            categories[current_category] = []

        elif link_match and current_category:
            link_title = link_match.group(1).strip()
            link_url = link_match.group(2).strip()
            link_description = link_match.group(3).strip()
            categories[current_category].append({
                'title': link_title,
                'url': link_url,
                'description': link_description
            })

    return categories

@api_view(['POST'])
def create_link(request):
    url = request.data.get('url')
    description = request.data.get('description')
    category = request.data.get('category')
    list_id = request.data.get('list')

    if not url or not list_id:
        return JsonResponse({"error": "URL and List ID are required"}, status=400)

    if not description:
        description = scrape_description(url)

    if not category:
        category = suggest_category(url, list_id)

    link = Link.objects.create(url=url, description=description, category=Category.objects.get_or_create(name=category)[0], list_id=list_id)
    return JsonResponse({"status": "success", "link_id": link.id}, status=201)

def scrape_description(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    description = soup.find('meta', {'name': 'description'}) or soup.find('meta', {'property': 'og:description'})
    return description['content'] if description else "No description available"

def suggest_category(url, list_id):
    openai.api_key = 'your_openai_api_key'
    list_obj = List.objects.get(id=list_id)
    existing_categories = [category.name for category in list_obj.categories.all()]
    prompt = f"Given the following URL: {url}, and the existing categories: {existing_categories}, suggest the most appropriate category for this URL."
    response = openai.Completion.create(engine="gpt-4", prompt=prompt, max_tokens=10)
    return response.choices[0].text.strip()

@api_view(['GET'])
def render_markdown(request, list_id=None):
    if list_id:
        lists = List.objects.filter(id=list_id)
    else:
        lists = List.objects.all()

    markdown_content = ""
    for list_obj in lists:
        markdown_content += f"# {list_obj.title}\n\n"
        for category in list_obj.categories.all():
            markdown_content += f"### {category.name}\n"
            for link in category.links.all():
                markdown_content += f"- [{link.title}]({link.url}) - {link.description}\n"

    # Write to a temporary file and run awesome-lint
    with open("temp_readme.md", "w") as f:
        f.write(markdown_content)

    result = subprocess.run(["awesome-lint", "temp_readme.md"], capture_output=True, text=True)
    if result.returncode != 0:
        return JsonResponse({"error": "Generated markdown does not comply with awesome list spec", "details": result.stdout}, status=400)

    return HttpResponse(markdown_content, content_type="text/markdown")
