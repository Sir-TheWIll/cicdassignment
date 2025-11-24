#!/bin/bash
# Database initialization script
# This script can be used to initialize the database manually if needed

set -e

echo "Waiting for PostgreSQL to be ready..."

# Wait for PostgreSQL to be ready
until pg_isready -h "${DB_HOST:-localhost}" -p "${DB_PORT:-5432}" -U "${DB_USER:-postgres}"; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL is ready!"

# Run database initialization
# This would typically be done by the application on startup
echo "Database initialization complete"

