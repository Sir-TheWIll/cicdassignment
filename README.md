# Task Manager Application

A full-stack Task Manager application built with Next.js, TypeScript, and PostgreSQL, fully containerized with Docker and automated CI/CD pipelines.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Docker Setup](#docker-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [CI/CD Pipeline](#cicd-pipeline)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)

## Overview

This is a production-ready Task Manager application that demonstrates:

- Docker containerization with multi-stage builds
- Docker Compose for multi-container orchestration
- PostgreSQL database setup and management
- Complete CI/CD pipeline with GitHub Actions
- Automated testing and code quality checks
- Security best practices

## Features

- User registration and authentication with JWT
- Task creation and management
- Task status tracking (pending, in_progress, completed)
- Task priority levels (low, medium, high)
- Secure password hashing with bcrypt
- Input validation with Zod
- Health check endpoint
- Automated database schema initialization

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker Desktop** (version 20.10 or later) - [Download](https://www.docker.com/products/docker-desktop)
- **Docker Compose** (included with Docker Desktop)
- **Node.js** (version 20 or later) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd cloudops-cicd-evaluation
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and update the values:

   ```env
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your-secure-password
   POSTGRES_DB=taskmanager
   DATABASE_URL=postgresql://postgres:your-secure-password@postgres:5432/taskmanager
   JWT_SECRET=your-jwt-secret-key
   NODE_ENV=production
   ```

   **Important:** Never commit the `.env` file to version control!

## Docker Setup

### Building the Docker Image

Build the Docker image for the application:

```bash
docker build -t task-manager .
```

This will create a multi-stage optimized Docker image.

### Running with Docker Compose

The easiest way to run the application is using Docker Compose, which will start both the PostgreSQL database and the Next.js application:

```bash
docker-compose up -d
```

This command will:

- Start PostgreSQL database container
- Wait for database to be healthy
- Start the Next.js application container
- Set up networking between containers

### Viewing Logs

To view logs from all services:

```bash
docker-compose logs -f
```

To view logs from a specific service:

```bash
docker-compose logs -f app
docker-compose logs -f postgres
```

### Stopping the Application

To stop all containers:

```bash
docker-compose down
```

To stop and remove volumes (⚠️ this will delete database data):

```bash
docker-compose down -v
```

### Docker Commands Reference

```bash
# Build image
docker build -t task-manager .

# Run container (without docker-compose)
docker run -p 3000:3000 --env-file .env task-manager

# View running containers
docker ps

# View container logs
docker logs <container-id>

# Execute command in running container
docker exec -it <container-id> sh

# Remove containers
docker-compose down

# Rebuild containers after changes
docker-compose up -d --build
```

## Environment Variables

The following environment variables are required:

| Variable            | Description                      | Example                                   |
| ------------------- | -------------------------------- | ----------------------------------------- |
| `DATABASE_URL`      | PostgreSQL connection string     | `postgresql://user:pass@host:5432/dbname` |
| `JWT_SECRET`        | Secret key for JWT token signing | Generate with: `openssl rand -base64 32`  |
| `POSTGRES_USER`     | PostgreSQL username              | `postgres`                                |
| `POSTGRES_PASSWORD` | PostgreSQL password              | `your-secure-password`                    |
| `POSTGRES_DB`       | PostgreSQL database name         | `taskmanager`                             |
| `NODE_ENV`          | Node.js environment              | `production` or `development`             |

### Generating Secure Secrets

Generate a secure JWT secret:

```bash
openssl rand -base64 32
```

## Running the Application

### Using Docker Compose (Recommended)

1. Ensure `.env` file is configured
2. Start services:
   ```bash
   docker-compose up -d
   ```
3. Access the application at: `http://localhost:3000`

### Running Locally (Development)

1. Ensure PostgreSQL is running (via Docker or locally)
2. Set up `.env` file with correct `DATABASE_URL`
3. Install dependencies: `npm install`
4. Run development server:
   ```bash
   npm run dev
   ```
5. Access at: `http://localhost:3000`

### Health Check

Verify the application is running:

```bash
curl http://localhost:3000/api/health
```

Expected response:

```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

This will generate a coverage report in the `coverage/` directory.

### Test Coverage Threshold

The CI pipeline enforces a minimum test coverage of 60%. Ensure your tests meet this threshold.

### Running Tests in Docker

You can also run tests in a Docker container:

```bash
docker-compose run app npm test
```

## CI/CD Pipeline

The project includes comprehensive GitHub Actions workflows for continuous integration and deployment.

### CI Pipeline (`.github/workflows/ci.yml`)

**Triggers:**

- Push to `main` branch
- Pull requests to `main` branch

**Jobs:**

1. **Build and Lint**
   - Checks out code
   - Sets up Node.js 20
   - Installs dependencies
   - Runs ESLint
   - Runs TypeScript type checking
   - Checks code formatting with Prettier
   - Builds the application

2. **Run Tests**
   - Sets up PostgreSQL service container
   - Runs all tests
   - Generates coverage report
   - Uploads coverage as artifact
   - Enforces 60% coverage threshold

3. **Code Quality and Security**
   - Checks code formatting
   - Runs ESLint
   - Runs `npm audit` for security vulnerabilities
   - Fails on high/critical vulnerabilities

### Release Pipeline (`.github/workflows/release.yml`)

**Triggers:**

- Push of tags matching `v*` pattern (e.g., `v1.0.0`)

**Actions:**

- Builds Docker image
- Tags image with version and `latest`
- Pushes to GitHub Container Registry (ghcr.io)
- Optionally pushes to Docker Hub (if credentials configured)
- Creates GitHub release with release notes

**Creating a Release:**

```bash
git tag v1.0.0
git push origin v1.0.0
```

### GitHub Secrets Configuration

For the release workflow, configure these secrets in GitHub repository settings:

- `DOCKER_USERNAME` (optional) - Docker Hub username
- `DOCKER_PASSWORD` (optional) - Docker Hub password/token

The workflow will automatically use `GITHUB_TOKEN` for GitHub Container Registry.

## Project Structure

```
cloudops-cicd-evaluation/
├── app/                    # Next.js application
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── tasks/        # Task management endpoints
│   │   └── health/       # Health check endpoint
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   └── tasks/            # Tasks management page
├── lib/                   # Utility libraries
│   ├── db.ts             # Database connection and initialization
│   ├── auth.ts           # Authentication utilities
│   └── validation.ts     # Input validation schemas
├── __tests__/            # Test files
├── .github/
│   └── workflows/        # GitHub Actions workflows
│       ├── ci.yml        # CI pipeline
│       └── release.yml   # Release pipeline
├── Dockerfile            # Multi-stage Docker build
├── .dockerignore         # Docker ignore patterns
├── docker-compose.yml    # Docker Compose configuration
├── .env.example          # Example environment variables
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user

  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```

- `POST /api/auth/login` - Login user

  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```

- `POST /api/auth/logout` - Logout user

### Tasks

All task endpoints require authentication (JWT token in cookie).

- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create a new task
  ```json
  {
    "title": "Complete assessment",
    "description": "Finish the CI/CD assessment",
    "status": "pending",
    "priority": "high"
  }
  ```
- `PATCH /api/tasks/[id]` - Update a task
- `DELETE /api/tasks/[id]` - Delete a task

### Health

- `GET /api/health` - Health check endpoint (no authentication required)

## Database Schema

### Users Table

| Column          | Type         | Constraints               |
| --------------- | ------------ | ------------------------- |
| `id`            | SERIAL       | PRIMARY KEY               |
| `username`      | VARCHAR(50)  | UNIQUE, NOT NULL          |
| `email`         | VARCHAR(100) | UNIQUE, NOT NULL          |
| `password_hash` | VARCHAR(255) | NOT NULL                  |
| `created_at`    | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |
| `updated_at`    | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

### Tasks Table

| Column        | Type         | Constraints               |
| ------------- | ------------ | ------------------------- |
| `id`          | SERIAL       | PRIMARY KEY               |
| `title`       | VARCHAR(255) | NOT NULL                  |
| `description` | TEXT         |                           |
| `status`      | VARCHAR(20)  | DEFAULT 'pending'         |
| `priority`    | VARCHAR(20)  | DEFAULT 'medium'          |
| `user_id`     | INTEGER      | FOREIGN KEY → users(id)   |
| `created_at`  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |
| `updated_at`  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

**Indexes:**

- `idx_tasks_user_id` on `tasks(user_id)`
- `idx_tasks_status` on `tasks(status)`
- `idx_users_email` on `users(email)`

The database schema is automatically initialized when the application starts.

## Security Considerations

### Secrets Management

- **Never commit `.env` files** - They are excluded via `.gitignore`
- Use GitHub Secrets for CI/CD pipeline credentials
- Generate strong secrets for production:
  ```bash
  openssl rand -base64 32
  ```

### Docker Security

- Application runs as non-root user (`nextjs` with UID 1001)
- Minimal base images (Alpine Linux)
- Multi-stage builds to reduce image size
- `.dockerignore` prevents secret leakage

### Application Security

- Password hashing with bcrypt (salt rounds: 10)
- JWT token authentication
- Input validation with Zod schemas
- Parameterized SQL queries (prevents SQL injection)
- HTTP-only cookies for token storage
- CORS protection (Next.js default)

### Best Practices

1. **Environment Variables:** Always use environment variables for sensitive data
2. **Database Connections:** Use connection pooling and proper error handling
3. **Input Validation:** Validate all user inputs with Zod schemas
4. **Error Handling:** Never expose sensitive error details to clients
5. **Dependencies:** Regularly update dependencies and run security audits

## Troubleshooting

### Database Connection Fails

**Symptoms:** Application can't connect to database

**Solutions:**

1. Verify `DATABASE_URL` format: `postgresql://user:password@host:port/database`
2. Ensure PostgreSQL container is running: `docker-compose ps`
3. Check database logs: `docker-compose logs postgres`
4. Verify network configuration in `docker-compose.yml`
5. Ensure database credentials match in `.env` file

### Application Won't Start

**Symptoms:** Container exits immediately or fails to start

**Solutions:**

1. Check container logs: `docker-compose logs app`
2. Verify environment variables are set correctly
3. Ensure database is healthy before app starts (check `depends_on` in docker-compose)
4. Verify port 3000 is not already in use
5. Check Dockerfile syntax and build: `docker build -t task-manager .`

### Tests Fail in CI

**Symptoms:** GitHub Actions test job fails

**Solutions:**

1. Ensure PostgreSQL service is configured in workflow
2. Verify `DATABASE_URL` environment variable is set in workflow
3. Check test database connection string format
4. Review test timeout settings
5. Run tests locally with same environment: `DATABASE_URL=... npm test`

### Docker Build Fails

**Symptoms:** `docker build` command fails

**Solutions:**

1. Check Dockerfile syntax
2. Verify base image exists: `docker pull node:20-alpine`
3. Check file paths in COPY commands
4. Review `.dockerignore` file
5. Ensure `package.json` and `package-lock.json` exist

### Coverage Below Threshold

**Symptoms:** CI fails with coverage below 60%

**Solutions:**

1. Run coverage locally: `npm run test:coverage`
2. Review coverage report in `coverage/` directory
3. Add tests for uncovered code paths
4. Focus on testing critical business logic
5. Ensure test files are not excluded in `jest.config.js`

### Port Already in Use

**Symptoms:** Error: `port 3000 is already in use`

**Solutions:**

1. Find process using port: `lsof -i :3000` (macOS/Linux)
2. Stop the process or change port in `docker-compose.yml`
3. Check for other Docker containers: `docker ps`

### Data Not Persisting

**Symptoms:** Data lost after container restart

**Solutions:**

1. Verify volume is configured in `docker-compose.yml`
2. Check volume exists: `docker volume ls`
3. Don't use `docker-compose down -v` (removes volumes)
4. Verify volume mount path in docker-compose

## Available Scripts

| Script                  | Description                    |
| ----------------------- | ------------------------------ |
| `npm run dev`           | Start development server       |
| `npm run build`         | Build for production           |
| `npm start`             | Start production server        |
| `npm test`              | Run tests                      |
| `npm run test:watch`    | Run tests in watch mode        |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint`          | Run ESLint                     |
| `npm run type-check`    | Run TypeScript type checking   |
| `npm run format`        | Format code with Prettier      |
| `npm run format:check`  | Check code formatting          |

## Contributing

This is an assessment project. For questions or issues, refer to `ASSESSMENT.md`.

## License

This project is for educational purposes as part of the CloudOps Academy assessment.

---

**Built with ❤️ for CloudOps Academy**
