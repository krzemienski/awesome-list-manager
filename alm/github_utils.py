import requests

GITHUB_API_URL = 'https://api.github.com'

def get_repo_content(repo, path, token):
    url = f'{GITHUB_API_URL}/repos/{repo}/contents/{path}'
    response = requests.get(url, headers={'Authorization': f'token {token}'})
    response.raise_for_status()
    return response.json()

def update_repo_content(repo, path, content, message, sha, token):
    url = f'{GITHUB_API_URL}/repos/{repo}/contents/{path}'
    data = {
        'message': message,
        'content': content.encode('utf-8').decode('utf-8'),
        'sha': sha,
    }
    response = requests.put(url, json=data, headers={'Authorization': f'token {token}'})
    response.raise_for_status()
    return response.json()
