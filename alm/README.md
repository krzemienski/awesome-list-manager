# AwesomeListManager (ALM)

A powerful tool for managing and enhancing GitHub Awesome Lists with AI-powered features.

## Features

- Import and sync GitHub Awesome Lists
- AI-powered categorization and suggestions
- Link validation with awesome_bot
- Easy list editing and organization
- Smart link discovery
- Secure authentication with GitHub OAuth

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/alm.git
cd alm
```

2. Start the development environment:
```bash
./scripts/dev.sh
```

3. Visit `http://localhost:3000` and sign in with GitHub.

## API Documentation

### Authentication

All API endpoints require authentication. Include the session cookie obtained after signing in with GitHub.

### Lists

#### Import a List

```bash
curl -X POST http://localhost:3000/api/lists \
  -H "Content-Type: application/json" \
  -d '{
    "github_repo_url": "https://github.com/username/awesome-list"
  }'
```

#### Get User's Lists

```bash
curl http://localhost:3000/api/lists
```

### Links

#### Add a Link

```bash
curl -X POST http://localhost:3000/api/lists/{listId}/links \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "title": "Optional Title",
    "description": "Optional Description",
    "category_id": "optional-category-id"
  }'
```

Response:
```json
{
  "id": "uuid",
  "list_id": "list-uuid",
  "category_id": "category-uuid",
  "title": "Example Title",
  "url": "https://example.com",
  "description": "Example description",
  "order": 0,
  "created_at": "2025-01-03T14:08:14Z",
  "updated_at": "2025-01-03T14:08:14Z"
}
```

#### Get List Links

```bash
curl http://localhost:3000/api/lists/{listId}/links
```

### Categories

#### Create Category

```bash
curl -X POST http://localhost:3000/api/lists/{listId}/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Category Name",
    "description": "Optional Description",
    "parent_category_id": "optional-parent-id"
  }'
```

#### Get List Categories

```bash
curl http://localhost:3000/api/lists/{listId}/categories
```

### AI Suggestions

#### Generate Suggestions

```bash
curl -X POST http://localhost:3000/api/lists/{listId}/suggestions
```

#### Get Pending Suggestions

```bash
curl http://localhost:3000/api/lists/{listId}/suggestions
```

#### Accept/Reject Suggestion

```bash
curl -X PUT http://localhost:3000/api/lists/{listId}/suggestions \
  -H "Content-Type: application/json" \
  -d '{
    "suggestion_id": "suggestion-uuid",
    "status": "accepted",
    "category_id": "category-uuid"
  }'
```

### User Settings

#### Get Settings

```bash
curl http://localhost:3000/api/user/settings
```

#### Update Settings

```bash
curl -X POST http://localhost:3000/api/user/settings \
  -H "Content-Type: application/json" \
  -d '{
    "openai_api_key": "your-api-key",
    "auto_categorize": true,
    "auto_suggest": true
  }'
```

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# OpenAI (optional)
OPENAI_API_KEY=your-openai-api-key
```

## Database Schema

The application uses Supabase with the following main tables:

- `profiles`: User profiles linked to GitHub accounts
- `lists`: Imported Awesome Lists
- `categories`: List categories with optional hierarchical structure
- `links`: List items with URLs and descriptions
- `suggestions`: AI-generated link suggestions
- `validation_results`: Link validation results
- `user_settings`: User preferences and API keys

## Docker Development

The project includes Docker configuration for local development:

```yaml
services:
  app:
    build:
      context: .
      target: development
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres

  db:
    image: supabase/postgres
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_PASSWORD=postgres

  studio:
    image: supabase/studio
    ports:
      - "3001:3000"
    environment:
      - SUPABASE_URL=http://kong:8000
      - STUDIO_PG_META_URL=http://meta:8080
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
