import subprocess
import tempfile
import os
import re
import requests
from typing import Dict
from urllib.parse import urlparse
from ..models import AwesomeList

class AwesomeValidator:
    def __init__(self, awesome_list: AwesomeList):
        self.awesome_list = awesome_list

    async def validate(self) -> Dict:
        results = {
            'lint': await self._run_awesome_lint(),
            'link_check': await self._check_links(),
            'format': self._validate_format(),
            'structure': self._validate_structure()
        }
        return results

    async def _run_awesome_lint(self) -> Dict:
        with tempfile.NamedTemporaryFile(mode='w', suffix='.md') as tmp:
            tmp.write(self.awesome_list.content)
            tmp.flush()

            try:
                result = subprocess.run(
                    ['npx', 'awesome-lint', tmp.name],
                    capture_output=True,
                    text=True
                )
                return {
                    'success': result.returncode == 0,
                    'output': result.stdout,
                    'errors': result.stderr
                }
            except Exception as e:
                return {
                    'success': False,
                    'output': '',
                    'errors': str(e)
                }