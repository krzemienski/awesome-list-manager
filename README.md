# Awesome List Manager (ALM)

## Description
ALM is a robust Python application for managing an awesome list repository. It features an administrative panel and a REST API for adding lists and links, suggesting categories, and managing existing links.

## Features
- Add and manage lists and links
- Auto-suggest categories based on URL
- Grab descriptions from URLs
- Search, edit, and manage links
- Link a Git repository with an access token to make commits
- Lint the generated README file
- Material Design for administrative interface

## Setup

### Prerequisites
- Docker
- Docker Compose

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/awesome-list-manager.git
   cd awesome-list-manager
   ```

2. Build and run the Docker containers:
   ```bash
   docker-compose up --build
   ```

3. Access the application at `http://localhost:8000`.

## API Endpoints

- `/api/lists/` - List all lists or create a new list
- `/api/lists/{id}/` - Retrieve, update, or delete a specific list
- `/api/links/` - List all links or create a new link
- `/api/links/{id}/` - Retrieve, update, or delete a specific link
- `/api/categories/` - List all categories or create a new category
- `/api/categories/{id}/` - Retrieve, update, or delete a specific category
- `/api/upload_readme/` - Upload `README.md` or URL to populate the database
- `/api/create_link/` - Create a new link
- `/api/update_readme/` - Update the README file in a GitHub repository
- `/api/render_markdown/` - Render markdown for all lists
- `/api/render_markdown/{list_id}/` - Render markdown for a specific list
- `/swagger/` - Swagger UI for API documentation

## Example Curl Commands

### List all lists
```bash
curl -X GET http://localhost:8000/api/lists/
```

### Create a new list
```bash
curl -X POST http://localhost:8000/api/lists/ -d '{"title": "New List", "description": "Description of the new list"}' -H "Content-Type: application/json"
```

### Retrieve a specific list
```bash
curl -X GET http://localhost:8000/api/lists/1/
```

### Update a specific list
```bash
curl -X PUT http://localhost:8000/api/lists/1/ -d '{"title": "Updated List", "description": "Updated description"}' -H "Content-Type: application/json"
```

### Delete a specific list
```bash
curl -X DELETE http://localhost:8000/api/lists/1/
```

### List all links
```bash
curl -X GET http://localhost:8000/api/links/
```

### Create a new link
```bash
curl -X POST http://localhost:8000/api/links/ -d '{"url": "https://example.com", "description": "Example link", "category": "Category", "list": 1}' -H "Content-Type: application/json"
```

### Retrieve a specific link
```bash
curl -X GET http://localhost:8000/api/links/1/
```

### Update a specific link
```bash
curl -X PUT http://localhost:8000/api/links/1/ -d '{"url": "https://updated.com", "description": "Updated link", "category": "Updated category", "list": 1}' -H "Content-Type: application/json"
```

### Delete a specific link
```bash
curl -X DELETE http://localhost:8000/api/links/1/
```

### List all categories
```bash
curl -X GET http://localhost:8000/api/categories/
```

### Create a new category
```bash
curl -X POST http://localhost:8000/api/categories/ -d '{"name": "New Category"}' -H "Content-Type: application/json"
```

### Retrieve a specific category
```bash
curl -X GET http://localhost:8000/api/categories/1/
```

### Update a specific category
```bash
curl -X PUT http://localhost:8000/api/categories/1/ -d '{"name": "Updated Category"}' -H "Content-Type: application/json"
```

### Delete a specific category
```bash
curl -X DELETE http://localhost:8000/api/categories/1/
```

### Upload `README.md` to populate the database
```bash
curl -X POST http://localhost:8000/api/upload_readme/ -F 'file=@README.md'
```

### Update the README file in a GitHub repository
```bash
curl -X POST http://localhost:8000/api/update_readme/ -d '{"repo": "yourusername/repository", "token": "your_github_token", "content": "New content for README", "path": "README.md"}' -H "Content-Type: application/json"
```

### Render markdown for all lists
```bash
curl -X GET http://localhost:8000/api/render_markdown/
```

### Render markdown for a specific list
```bash
curl -X GET http://localhost:8000/api/render_markdown/1/
```

## License
This project is licensed under the MIT License.
