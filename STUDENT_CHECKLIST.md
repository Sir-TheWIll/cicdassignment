# Student Assessment Checklist

Use this checklist to track your progress through the assessment.

## Day 1: Dockerization and Database Setup

### Task 1.1: Dockerfile Creation
- [ ] Created `Dockerfile` with multi-stage build
- [ ] Used appropriate base images (Node.js Alpine)
- [ ] Set proper working directory
- [ ] Implemented layer caching optimization
- [ ] Runs as non-root user
- [ ] Created `.dockerignore` file
- [ ] Docker build succeeds: `docker build -t task-manager .`
- [ ] Docker run works: `docker run -p 3000:3000 task-manager`

### Task 1.2: Docker Compose Setup
- [ ] Created `docker-compose.yml` file
- [ ] Configured PostgreSQL service
- [ ] Configured Next.js app service
- [ ] Set up proper networking
- [ ] Added health checks
- [ ] Configured persistent volumes
- [ ] Created `.env` file (NOT committed to git)
- [ ] Both containers start: `docker-compose up -d`
- [ ] Containers communicate properly

### Task 1.3: Database Connection
- [ ] Application connects to database
- [ ] Database schema initializes automatically
- [ ] Can register users
- [ ] Can create tasks
- [ ] Data persists after container restart
- [ ] Connection errors handled gracefully

### Task 1.4: Testing
- [ ] All tests pass: `npm test`
- [ ] Test coverage meets 60% threshold
- [ ] Manual testing completed:
  - [ ] User registration works
  - [ ] User login works
  - [ ] Task creation works
  - [ ] Task viewing works
  - [ ] Task deletion works
- [ ] Health check endpoint works: `/api/health`

## Day 2: CI/CD Pipeline and Security

### Task 2.1: Build Pipeline
- [ ] Created `.github/workflows/ci.yml`
- [ ] Pipeline triggers on push/PR
- [ ] Checks out code
- [ ] Sets up Node.js
- [ ] Caches dependencies
- [ ] Runs linting
- [ ] Runs type checking
- [ ] Builds application
- [ ] Pipeline passes on GitHub

### Task 2.2: Test Pipeline
- [ ] PostgreSQL service configured in workflow
- [ ] Tests run in CI
- [ ] Coverage report generated
- [ ] Coverage threshold enforced (60%)
- [ ] Coverage uploaded as artifact
- [ ] All tests pass in CI

### Task 2.3: Quality Checks
- [ ] Prettier formatting check added
- [ ] ESLint checks pass
- [ ] Security scanning implemented (npm audit)
- [ ] Pipeline fails on quality issues
- [ ] Clear error messages provided

### Task 2.4: Release Workflow
- [ ] Created release workflow
- [ ] Triggers on tag creation
- [ ] Builds Docker image
- [ ] Tags image properly
- [ ] Pushes to registry (Docker Hub/GHCR)
- [ ] Uses GitHub Secrets for credentials
- [ ] Creates GitHub release

### Task 2.5: Security Hardening
- [ ] Environment variables secured
- [ ] No secrets in code
- [ ] Input validation verified
- [ ] Docker images secured (non-root user)
- [ ] `.dockerignore` prevents secret leakage
- [ ] `.env` in `.gitignore`
- [ ] Security documentation added

### Task 2.6: Documentation
- [ ] README.md created/updated
- [ ] Installation instructions clear
- [ ] Docker setup documented
- [ ] Environment variables documented
- [ ] CI/CD pipeline explained
- [ ] Troubleshooting section added
- [ ] Examples provided

## Final Checks

### Code Quality
- [ ] All code committed to Git
- [ ] Clear commit messages
- [ ] No console.logs in production code
- [ ] Code is properly formatted
- [ ] No TypeScript errors

### Repository
- [ ] Repository is public or accessible
- [ ] All required files present
- [ ] `.env` NOT committed
- [ ] `.gitignore` properly configured
- [ ] No secrets in repository

### Functionality
- [ ] Application runs locally with Docker
- [ ] All features work correctly
- [ ] Database operations work
- [ ] Authentication works
- [ ] API endpoints respond correctly

### CI/CD
- [ ] CI pipeline passes
- [ ] All checks green
- [ ] Coverage report available
- [ ] Release workflow tested (if applicable)

## Submission

- [ ] Repository URL shared
- [ ] Screenshots provided:
  - [ ] CI pipeline success
  - [ ] Test coverage report
  - [ ] Docker containers running
- [ ] README.md complete
- [ ] All tasks completed

---

**Good luck! 🚀**

