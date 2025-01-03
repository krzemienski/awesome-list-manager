#!/bin/bash

# Ensure the script stops on first error
set -e

# Check if .env file exists, if not create it from example
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "Please update the .env file with your actual values"
    exit 1
fi

# Start all services
echo "Starting services..."
docker-compose up -d

# Wait for database to be ready
echo "Waiting for database to be ready..."
sleep 5

# Run database migrations
echo "Running database migrations..."
docker-compose exec db psql -U postgres -d alm -f /docker-entrypoint-initdb.d/schema.sql

echo "Development environment is ready!"
echo "Access the application at http://localhost:3000"
echo "Access Supabase Studio at http://localhost:3001"
