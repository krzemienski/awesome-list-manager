from github import Github
import base64
from ..models import AwesomeList, Category, Link
import re
import asyncio
from typing import Dict, List, Optional

class GitHubService:
    def __init__(self, token: str):
        self.github = Github(token)

    async def import_repository(self, user, github_url: str) -> AwesomeList:
        repo_name = self._extract_repo_name(github_url)
        repo = self.github.get_repo(repo_name)

        try:
            content = base64.b64decode(
                repo.get_contents("README.md").content
            ).decode('utf-8')
        except Exception as e:
            raise ValueError(f"Could not fetch README.md: {str(e)}")

        awesome_list = AwesomeList.objects.create(
            user=user,
            name=repo.name,
            github_url=github_url,
            content=content
        )

        await self._parse_content(awesome_list, content)
        return awesome_list

    def _extract_repo_name(self, url: str) -> str:
        match = re.search(r'github.com/([^/]+/[^/]+)', url)
        if not match:
            raise ValueError("Invalid GitHub URL")
        return match.group(1)