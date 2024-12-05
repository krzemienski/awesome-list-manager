from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import AwesomeList, Category, Link, ValidationResult
from .serializers import (AwesomeListSerializer, CategorySerializer,
                         LinkSerializer, ValidationResultSerializer)
from .services.github import GitHubService
from .services.validation import AwesomeValidator
from .services.ml import MLService
from .services.link_processor import LinkProcessor
from django.shortcuts import get_object_or_404
from django.db.models import Q

class AwesomeListViewSet(viewsets.ModelViewSet):
    serializer_class = AwesomeListSerializer

    def get_queryset(self):
        return AwesomeList.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    async def import_repo(self, request):
        github_url = request.data.get('github_url')
        if not github_url:
            return Response(
                {'error': 'GitHub URL is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        github_service = GitHubService(
            request.user.social_auth.get(provider='github').access_token
        )
        awesome_list = await github_service.import_repository(request.user, github_url)
        return Response(AwesomeListSerializer(awesome_list).data)

    @action(detail=True, methods=['post'])
    async def validate(self, request, pk=None):
        awesome_list = self.get_object()
        validator = AwesomeValidator(awesome_list)
        results = await validator.validate()

        validation = ValidationResult.objects.create(
            awesome_list=awesome_list,
            lint_success=results['lint']['success'],
            lint_output=results['lint']['output'],
            link_check_success=results['link_check']['success'],
            link_check_output=results['link_check']['output']
        )

        return Response(ValidationResultSerializer(validation).data)

    @action(detail=True, methods=['post'])
    async def improve(self, request, pk=None):
        awesome_list = self.get_object()
        ml_service = MLService()
        improvements = await ml_service.suggest_improvements(awesome_list)

        if request.data.get('auto_apply'):
            await ml_service.apply_improvements(awesome_list, improvements)

        return Response(improvements)

    @action(detail=True, methods=['get'])
    def markdown(self, request, pk=None):
        awesome_list = self.get_object()
        github_service = GitHubService(
            request.user.social_auth.get(provider='github').access_token
        )
        content = github_service.generate_markdown(awesome_list)

        from django.http import HttpResponse
        response = HttpResponse(content, content_type='text/markdown')
        response['Content-Disposition'] = 'attachment; filename=README.md'
        return response