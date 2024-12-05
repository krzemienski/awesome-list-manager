# AwesomeList Manager

Manage GitHub awesome-lists with AI-powered categorization and content discovery.

## Features
- GitHub awesome-list import/export
- AI-powered categorization
- Content validation
- Link management
- Automated improvements

## Quick Start
```bash
# Clone repository
git clone https://github.com/yourusername/awesome-list-manager
cd awesome-list-manager

# Start services
docker-compose up -d

# Create superuser
docker-compose exec backend python manage.py createsuperuser
```

Visit http://localhost:3000

## Development

### Prerequisites
- Docker & Docker Compose
- Python 3.9+
- Node.js 18+

### Setup
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Frontend
cd frontend
npm install

# Environment
cp .env.example .env
# Edit .env with your settings
```

### Running Tests
```bash
# Backend tests
pytest

# Frontend tests
npm test
```

## Deployment
```bash
# Production deployment
docker-compose -f docker-compose.prod.yml up -d
```

## API Documentation
Swagger UI: http://localhost:8000/swagger/

## License
MIT
