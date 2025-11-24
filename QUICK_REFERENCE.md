# Quick Reference Guide

Common commands and snippets you'll need during the assessment.

## Docker Commands

### Build Docker Image
```bash
docker build -t task-manager .
```

### Run Docker Container
```bash
docker run -p 3000:3000 --env-file .env task-manager
```

### View Running Containers
```bash
docker ps
```

### View Container Logs
```bash
docker logs <container-id>
```

### Stop Container
```bash
docker stop <container-id>
```

### Remove Container
```bash
docker rm <container-id>
```

### Remove Image
```bash
docker rmi task-manager
```

## Docker Compose Commands

### Start Services
```bash
docker-compose up -d
```

### Start with Build
```bash
docker-compose up -d --build
```

### View Logs
```bash
docker-compose logs -f
```

### View Logs for Specific Service
```bash
docker-compose logs -f app
docker-compose logs -f postgres
```

### Stop Services
```bash
docker-compose down
```

### Stop and Remove Volumes
```bash
docker-compose down -v
```

### Rebuild Services
```bash
docker-compose build
```

### Execute Command in Container
```bash
docker-compose exec app npm test
docker-compose exec postgres psql -U postgres -d taskmanager
```

## Node.js Commands

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build Application
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Run Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Lint Code
```bash
npm run lint
```

### Type Check
```bash
npm run type-check
```

### Format Code
```bash
npm run format
```

### Check Formatting
```bash
npm run format:check
```

## Database Commands

### Connect to PostgreSQL (Local)
```bash
psql -U postgres -d taskmanager
```

### Connect to PostgreSQL (Docker)
```bash
docker-compose exec postgres psql -U postgres -d taskmanager
```

### List Tables
```sql
\dt
```

### Describe Table
```sql
\d users
\d tasks
```

### View All Users
```sql
SELECT * FROM users;
```

### View All Tasks
```sql
SELECT * FROM tasks;
```

### Exit psql
```sql
\q
```

## Git Commands

### Check Status
```bash
git status
```

### Add Files
```bash
git add .
git add <file>
```

### Commit Changes
```bash
git commit -m "Descriptive commit message"
```

### Push to Remote
```bash
git push origin main
```

### Create Branch
```bash
git checkout -b feature/docker-setup
```

### View Logs
```bash
git log --oneline
```

## GitHub Actions

### Check Workflow Status
- Go to your repository on GitHub
- Click on "Actions" tab
- View workflow runs

### Manual Workflow Trigger
```yaml
on:
  workflow_dispatch:  # Add this to trigger manually
```

### View Workflow Logs
- Click on a workflow run
- Click on a job
- View step logs

## Environment Variables

### Create .env File
```bash
cp .env.example .env
# Edit .env with your values
```

### Load Environment Variables
```bash
source .env  # Linux/Mac
```

### Check Environment Variables
```bash
echo $DATABASE_URL
```

## Testing

### Run Specific Test File
```bash
npm test -- auth.test.ts
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Verbose Output
```bash
npm test -- --verbose
```

## Troubleshooting

### Clear Docker Cache
```bash
docker system prune -a
```

### Remove All Containers
```bash
docker rm -f $(docker ps -aq)
```

### Remove All Images
```bash
docker rmi -f $(docker images -q)
```

### Check Port Usage
```bash
lsof -i :3000
lsof -i :5432
```

### Kill Process on Port
```bash
kill -9 $(lsof -t -i:3000)
```

### View Docker Network
```bash
docker network ls
docker network inspect <network-name>
```

## Health Checks

### Application Health
```bash
curl http://localhost:3000/api/health
```

### Database Health (Docker)
```bash
docker-compose exec postgres pg_isready -U postgres
```

## Useful Dockerfile Snippets

### Multi-stage Build
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
CMD ["npm", "start"]
```

### Non-root User
```dockerfile
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
```

## Useful docker-compose.yml Snippets

### PostgreSQL Service
```yaml
postgres:
  image: postgres:15-alpine
  environment:
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: postgres
    POSTGRES_DB: taskmanager
  volumes:
    - postgres_data:/var/lib/postgresql/data
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U postgres"]
    interval: 10s
    timeout: 5s
    retries: 5
```

### App Service with Dependencies
```yaml
app:
  build: .
  ports:
    - "3000:3000"
  environment:
    - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/taskmanager
  depends_on:
    postgres:
      condition: service_healthy
```

## GitHub Actions Snippets

### Setup Node.js with Caching
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
```

### PostgreSQL Service
```yaml
services:
  postgres:
    image: postgres:15-alpine
    env:
      POSTGRES_USER: test
      POSTGRES_PASSWORD: test
      POSTGRES_DB: testdb
    options: >-
      --health-cmd pg_isready
      --health-interval 10s
      --health-timeout 5s
      --health-retries 5
    ports:
      - 5432:5432
```

---

**Bookmark this page for quick reference during the assessment!**

