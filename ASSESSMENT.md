# CI/CD and Docker Assessment - Task Manager Application

---

<div align="center">

### 📋 Prepared by

<br>

## Engr. Akum Blaise

**DevOps & Platform Engineer**  
**Instructor, CloudOps Academy**

<br>

---

</div>

## Overview

This is a **2-day comprehensive assessment** designed to evaluate your knowledge and practical skills in:
- Docker containerization
- Database setup and management
- CI/CD pipeline implementation with GitHub Actions
- Application security best practices
- DevOps fundamentals

**Target Level:** Junior DevOps Engineer

**Estimated Time:** 2 days (16 hours)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Assessment Objectives](#assessment-objectives)
3. [Prerequisites](#prerequisites)
4. [Project Structure](#project-structure)
5. [Tasks Breakdown](#tasks-breakdown)
6. [Evaluation Criteria](#evaluation-criteria)
7. [Submission Guidelines](#submission-guidelines)

---

## Project Overview

You are given a **Task Manager Application** built with Next.js and TypeScript. The application is a full-stack web application that allows users to:
- Register and authenticate
- Create, view, and manage tasks
- Organize tasks by status and priority

**Current State:**
- ✅ Application code is complete and functional
- ✅ Database schema is defined in code
- ❌ **NOT dockerized** - You need to create Dockerfiles
- ❌ **Database NOT configured** - You need to set up PostgreSQL in Docker
- ❌ **NO CI/CD pipeline** - You need to create GitHub Actions workflows
- ❌ **Tests may fail** - You need to ensure all tests pass

**Your Mission:**
Transform this application into a production-ready, containerized application with a complete CI/CD pipeline.

---

## Assessment Objectives

By the end of this assessment, you should demonstrate:

1. **Docker Proficiency**
   - Create optimized Dockerfiles for the application
   - Set up and configure database containers
   - Use Docker Compose for multi-container orchestration
   - Implement proper Docker best practices

2. **Database Management**
   - Configure PostgreSQL database
   - Set up database initialization
   - Manage database connections and migrations
   - Handle environment variables securely

3. **CI/CD Pipeline Implementation**
   - Build automated testing pipeline
   - Implement code quality checks
   - Set up automated builds
   - Create release/deployment workflows
   - Use GitHub Actions effectively

4. **Security Awareness**
   - Secure environment variable management
   - Implement proper secrets handling
   - Follow security best practices
   - Validate and sanitize inputs

5. **DevOps Best Practices**
   - Write clear documentation
   - Follow containerization best practices
   - Implement proper error handling
   - Ensure application reliability

---

## Prerequisites

Before starting, ensure you have:

- ✅ Docker Desktop installed and running
- ✅ Git installed
- ✅ A GitHub account
- ✅ Basic knowledge of:
  - Docker and Docker Compose
  - PostgreSQL
  - GitHub Actions
  - Node.js and npm
  - Environment variables

---

## Project Structure

```
cloudops-cicd-evaluation/
├── app/                    # Next.js application pages and API routes
│   ├── api/               # API endpoints
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
├── __tests__/            # Test files (you need to make these pass!)
├── .env.example          # Example environment variables
├── docker-compose.example.yml  # Example docker-compose (reference only)
├── package.json          # Dependencies and scripts
└── ASSESSMENT.md         # This file
```

---

## Tasks Breakdown

### Day 1: Dockerization and Database Setup

#### Task 1.1: Create Dockerfile for Next.js Application (2 hours)

**Objective:** Create an optimized, production-ready Dockerfile for the Next.js application.

**Requirements:**
- Use multi-stage builds (build stage + production stage)
- Use appropriate base images (Node.js Alpine recommended)
- Set proper working directory
- Copy only necessary files
- Install dependencies efficiently
- Build the Next.js application
- Expose port 3000
- Run as non-root user (security best practice)
- Use `.dockerignore` to exclude unnecessary files
- Optimize for layer caching

**Deliverables:**
- `Dockerfile` in the root directory
- `.dockerignore` file
- Application should build successfully: `docker build -t task-manager .`
- Application should run: `docker run -p 3000:3000 task-manager`

**Evaluation Points:**
- Multi-stage build implementation
- Security best practices (non-root user)
- Layer optimization
- Proper use of .dockerignore

---

#### Task 1.2: Set Up PostgreSQL Database Container (2 hours)

**Objective:** Configure PostgreSQL database using Docker and connect the Next.js app to it.

**Requirements:**
- Create a `docker-compose.yml` file
- Set up PostgreSQL service with:
  - Appropriate PostgreSQL version (15 or latest)
  - Database name: `taskmanager`
  - Username and password (use environment variables)
  - Persistent volume for data
  - Health checks
  - Proper port mapping
- Configure the Next.js app service in docker-compose
- Set up proper networking between containers
- Use environment variables for configuration
- Ensure database initialization happens automatically
- Create a `.env` file (DO NOT commit this to git)

**Deliverables:**
- `docker-compose.yml` file
- `.env` file (local only, not committed)
- Both containers should start: `docker-compose up -d`
- Application should connect to database successfully
- Database tables should be created automatically on first run

**Evaluation Points:**
- Proper docker-compose configuration
- Environment variable management
- Database persistence
- Health checks
- Container networking

---

#### Task 1.3: Database Connection and Initialization (2 hours)

**Objective:** Ensure the application properly connects to the database and initializes schema.

**Requirements:**
- Verify database connection string format
- Ensure `initDatabase()` function runs on application start
- Handle connection errors gracefully
- Implement connection retry logic (optional but recommended)
- Test database operations (create user, create task)
- Ensure database persists data across container restarts

**Deliverables:**
- Application successfully connects to database
- Database schema is created automatically
- Can register users and create tasks
- Data persists after container restart

**Evaluation Points:**
- Connection handling
- Error handling
- Data persistence
- Schema initialization

---

#### Task 1.4: Testing and Validation (2 hours)

**Objective:** Ensure all tests pass and application works correctly.

**Requirements:**
- Run all tests: `npm test`
- Fix any failing tests
- Ensure test coverage meets minimum requirements (60%)
- Test the application manually:
  - Register a new user
  - Login
  - Create tasks
  - View tasks
  - Delete tasks
- Verify health check endpoint: `http://localhost:3000/api/health`

**Deliverables:**
- All tests passing
- Test coverage report
- Manual testing completed
- Health check working

**Evaluation Points:**
- Test execution
- Test fixes
- Coverage requirements

---

### Day 2: CI/CD Pipeline and Security

#### Task 2.1: GitHub Actions - Build Pipeline (2 hours)

**Objective:** Create a CI pipeline that builds the application on every push.

**Requirements:**
- Create `.github/workflows/ci.yml`
- Trigger on push to main and pull requests
- Set up job to:
  - Checkout code
  - Set up Node.js environment
  - Install dependencies
  - Run linting: `npm run lint`
  - Run type checking: `npm run type-check`
  - Build the application: `npm run build`
- Use appropriate Node.js version
- Cache node_modules for faster builds
- Fail the pipeline if any step fails

**Deliverables:**
- `.github/workflows/ci.yml` file
- Pipeline runs on push/PR
- Build succeeds
- Linting and type checking pass

**Evaluation Points:**
- Workflow structure
- Proper triggers
- Caching implementation
- Error handling

---

#### Task 2.2: GitHub Actions - Test Pipeline (2 hours)

**Objective:** Create a test pipeline that runs all tests and generates coverage reports.

**Requirements:**
- Extend or create separate workflow for testing
- Set up PostgreSQL service in GitHub Actions
- Configure test database connection
- Run tests: `npm test`
- Generate coverage report: `npm run test:coverage`
- Upload coverage reports as artifacts
- Set minimum coverage threshold (60%)
- Fail if coverage is below threshold
- Run tests in parallel if possible

**Deliverables:**
- Test workflow configured
- All tests pass in CI
- Coverage reports generated
- Coverage threshold enforced

**Evaluation Points:**
- Test execution in CI
- Database service setup
- Coverage reporting
- Artifact management

---

#### Task 2.3: GitHub Actions - Quality Checks (2 hours)

**Objective:** Implement code quality checks in the CI pipeline.

**Requirements:**
- Add Prettier formatting check: `npm run format:check`
- Add ESLint checks (already in lint script)
- Add security vulnerability scanning (npm audit or Snyk)
- Add Docker image security scanning (optional but recommended)
- Fail pipeline on quality issues
- Provide clear error messages

**Deliverables:**
- Quality checks in pipeline
- Formatting validation
- Security scanning
- Pipeline fails on quality issues

**Evaluation Points:**
- Code quality tools
- Security scanning
- Pipeline integration
- Error reporting

---

#### Task 2.4: GitHub Actions - Release Workflow (2 hours)

**Objective:** Create a release workflow that builds and tags Docker images.

**Requirements:**
- Create `.github/workflows/release.yml`
- Trigger on tag creation (e.g., `v1.0.0`)
- Build Docker image
- Tag image with version and `latest`
- Push to Docker Hub or GitHub Container Registry
- Use GitHub Secrets for registry credentials
- Add release notes
- Create GitHub release

**Deliverables:**
- Release workflow file
- Docker image builds on tag
- Image pushed to registry
- GitHub release created

**Evaluation Points:**
- Release automation
- Docker image management
- Secrets management
- Versioning strategy

---

#### Task 2.5: Security Hardening (2 hours)

**Objective:** Implement security best practices throughout the application.

**Requirements:**
- Review and secure environment variables
- Ensure secrets are not hardcoded
- Implement proper input validation (already done, verify it works)
- Add rate limiting (optional but recommended)
- Secure Docker images (non-root user, minimal base images)
- Add security headers (optional)
- Document security considerations in README
- Use `.dockerignore` to prevent secret leakage
- Ensure `.env` files are in `.gitignore`

**Deliverables:**
- Security review completed
- Secrets properly managed
- Security documentation
- No secrets in code or images

**Evaluation Points:**
- Secrets management
- Input validation
- Docker security
- Documentation

---

#### Task 2.6: Documentation (2 hours)

**Objective:** Create comprehensive documentation for the project.

**Requirements:**
- Create `README.md` with:
  - Project description
  - Prerequisites
  - Installation instructions
  - Docker setup instructions
  - Environment variables documentation
  - Running the application
  - Running tests
  - CI/CD pipeline overview
  - Troubleshooting section
- Document Docker commands
- Document docker-compose usage
- Add comments to Dockerfiles
- Document any custom configurations

**Deliverables:**
- Complete README.md
- Clear instructions
- Examples provided
- Troubleshooting guide

**Evaluation Points:**
- Documentation completeness
- Clarity and readability
- Examples and usage
- Troubleshooting

---

## Evaluation Criteria

### Technical Implementation (60%)

1. **Docker Implementation (20%)**
   - Dockerfile quality and optimization
   - Multi-stage builds
   - Security best practices
   - docker-compose configuration

2. **Database Setup (10%)**
   - Proper database configuration
   - Connection handling
   - Schema initialization
   - Data persistence

3. **CI/CD Pipeline (20%)**
   - Build pipeline functionality
   - Test pipeline with coverage
   - Quality checks
   - Release workflow

4. **Security (10%)**
   - Secrets management
   - Input validation
   - Docker security
   - Best practices

### Code Quality (20%)

- Test coverage (minimum 60%)
- Code formatting
- Linting compliance
- Type safety

### Documentation (10%)

- README completeness
- Clear instructions
- Examples provided
- Code comments

### Best Practices (10%)

- Git commit messages
- Project structure
- Error handling
- Logging

---

## Submission Guidelines

### What to Submit

1. **GitHub Repository**
   - Fork or clone this repository
   - Complete all tasks
   - Push to your GitHub account
   - Ensure all files are committed

2. **Required Files**
   - `Dockerfile`
   - `.dockerignore`
   - `docker-compose.yml`
   - `.github/workflows/ci.yml`
   - `.github/workflows/release.yml` (or combined workflow)
   - `README.md`
   - `.env.example` (updated if needed)

3. **Repository Requirements**
   - All code should be committed
   - Clear commit messages
   - No secrets in code
   - `.env` file should NOT be committed
   - `.gitignore` properly configured

### Submission Format

1. **GitHub Repository URL**
   - Share the repository link
   - Ensure it's public or accessible

2. **Screenshots/Documentation**
   - Screenshot of successful CI pipeline runs
   - Screenshot of test coverage report
   - Screenshot of Docker containers running
   - Any additional documentation

3. **Video Walkthrough (Optional but Recommended)**
   - 5-10 minute video demonstrating:
     - Application running
     - Docker setup
     - CI/CD pipeline execution
     - Key features

### Evaluation Process

1. **Automated Checks**
   - CI pipeline must pass
   - All tests must pass
   - Code quality checks must pass

2. **Manual Review**
   - Code review
   - Docker implementation review
   - Documentation review
   - Security review

3. **Functional Testing**
   - Application runs correctly
   - Database connection works
   - All features functional

---

## Tips and Best Practices

### Docker Tips

- Use `.dockerignore` to reduce build context size
- Leverage layer caching by ordering commands correctly
- Use specific image tags, not `latest`
- Keep images small (use Alpine variants)
- Run as non-root user

### CI/CD Tips

- Use matrix builds for multiple Node.js versions (optional)
- Cache dependencies to speed up builds
- Use conditionals to skip unnecessary steps
- Add status badges to README
- Use workflow_dispatch for manual triggers

### Security Tips

- Never commit `.env` files
- Use GitHub Secrets for sensitive data
- Scan images for vulnerabilities
- Use least privilege principle
- Validate all inputs

### Testing Tips

- Write tests before fixing issues
- Aim for high coverage but focus on quality
- Test edge cases
- Mock external dependencies
- Keep tests fast and isolated

---

## Common Issues and Solutions

### Issue: Database Connection Fails

**Solution:**
- Check DATABASE_URL format
- Ensure database container is running
- Verify network configuration in docker-compose
- Check database credentials

### Issue: Tests Fail in CI

**Solution:**
- Ensure PostgreSQL service is configured in GitHub Actions
- Check test database connection string
- Verify environment variables are set
- Check test timeout settings

### Issue: Docker Build Fails

**Solution:**
- Check Dockerfile syntax
- Verify base image exists
- Check file paths in COPY commands
- Review .dockerignore file

### Issue: Application Won't Start

**Solution:**
- Check environment variables
- Verify database is ready before app starts
- Check application logs
- Verify port mappings

---

## Resources

### Documentation

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Tools

- [Docker Hub](https://hub.docker.com/)
- [GitHub Container Registry](https://github.com/features/packages)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

## Questions?

If you have questions during the assessment:

1. Review the documentation first
2. Check the example files provided
3. Refer to the resources section
4. Contact your instructor if needed

**Good luck! 🚀**

---

## Checklist

Use this checklist to ensure you've completed everything:

### Day 1
- [ ] Dockerfile created and optimized
- [ ] .dockerignore created
- [ ] docker-compose.yml configured
- [ ] Database container running
- [ ] Application connects to database
- [ ] Database schema initialized
- [ ] All tests passing
- [ ] Application tested manually

### Day 2
- [ ] CI workflow created
- [ ] Build pipeline working
- [ ] Test pipeline working
- [ ] Coverage reports generated
- [ ] Quality checks implemented
- [ ] Release workflow created
- [ ] Security review completed
- [ ] README.md created
- [ ] All files committed to Git
- [ ] CI pipeline passing
- [ ] No secrets in code

---

**Assessment Duration:** 2 days  
**Total Estimated Time:** 16 hours  
**Difficulty Level:** Junior DevOps Engineer

