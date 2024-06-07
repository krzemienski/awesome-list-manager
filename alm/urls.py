from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ListViewSet, LinkViewSet, CategoryViewSet, upload_readme, create_link, render_markdown
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

router = DefaultRouter()
router.register(r'lists', ListViewSet)
router.register(r'links', LinkViewSet)
router.register(r'categories', CategoryViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="ALM API",
        default_version='v1',
        description="API for Awesome List Manager",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@alm.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/upload_readme/', upload_readme),
    path('api/create_link/', create_link),
    path('api/render_markdown/', render_markdown),
    path('api/render_markdown/<int:list_id>/', render_markdown),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
