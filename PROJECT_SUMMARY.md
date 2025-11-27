# Project Summary - CI/CD Assessment

## Project Overview

This is a comprehensive 2-day CI/CD and Docker assessment project for students learning DevOps fundamentals. The project includes a fully functional Next.js Task Manager application that students must dockerize, set up with a database, and implement a complete CI/CD pipeline.

## Project Structure

```
cloudops-cicd-evaluation/
├── app/                          # Next.js application
│   ├── api/                     # API routes
│   │   ├── auth/               # Authentication endpoints
│   │   ├── tasks/              # Task management endpoints
│   │   └── health/             # Health check endpoint
│   ├── login/                  # Login page
│   ├── register/               # Registration page
│   ├── tasks/                  # Tasks management page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── lib/                         # Utility libraries
│   ├── db.ts                   # Database connection & initialization
│   ├── auth.ts                 # Authentication utilities
│   └── validation.ts           # Input validation schemas
├── __tests__/                   # Test files
│   ├── api/                    # API route tests
│   └── lib/                    # Library tests
├── scripts/                     # Utility scripts
│   └── init-db.sh              # Database initialization script
├── .github/
│   └── workflows/
│       └── example-ci.yml       # Example CI workflow (reference)
├── ASSESSMENT.md               # Main assessment instructions
├── INSTRUCTOR_GUIDE.md         # Guide for instructors
├── STUDENT_CHECKLIST.md        # Progress checklist for students
├── ENV_SETUP.md                # Environment variables guide
├── README.md                   # Project README
├── docker-compose.example.yml  # Example docker-compose (reference)
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── jest.config.js              # Jest test configuration
├── next.config.js              # Next.js configuration
├── middleware.ts               # Next.js middleware for auth
└── .dockerignore               # Docker ignore file
```

## Application Features

### Authentication

- User registration with validation
- Secure password hashing (bcrypt)
- JWT token-based authentication
- HTTP-only cookies for token storage

### Task Management

- Create, read, update, delete tasks
- Task status tracking (pending, in_progress, completed)
- Task priority levels (low, medium, high)
- User-specific task isolation

### Security

- Input validation with Zod
- SQL injection prevention (parameterized queries)
- Password strength requirements
- Secure environment variable handling

### Database

- PostgreSQL database
- Automatic schema initialization
- User and task tables
- Proper indexing for performance

## Technology Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL
- **Authentication:** JWT, bcrypt
- **Validation:** Zod
- **Testing:** Jest, Testing Library
- **Code Quality:** ESLint, Prettier, TypeScript

## What Students Must Create

### Day 1: Dockerization

1. **Dockerfile** - Multi-stage build for Next.js app
2. **.dockerignore** - Already provided, but students should understand it
3. **docker-compose.yml** - PostgreSQL + Next.js orchestration
4. **.env** - Environment variables (local, not committed)

### Day 2: CI/CD

1. **.github/workflows/ci.yml** - Build and test pipeline
2. **.github/workflows/release.yml** - Release workflow (optional, can be combined)
3. **Documentation** - Complete README.md
4. **Security** - Implement best practices

## Assessment Goals

Students will demonstrate:

1. Docker containerization skills
2. Database setup and management
3. CI/CD pipeline implementation
4. Security best practices
5. DevOps fundamentals
6. Documentation skills

## Key Files for Students

### Must Read

- `ASSESSMENT.md` - Complete assessment instructions
- `README.md` - Project overview
- `STUDENT_CHECKLIST.md` - Progress tracking

### Reference Files

- `docker-compose.example.yml` - Example docker-compose (reference only)
- `.github/workflows/example-ci.yml` - Example CI workflow (reference only)
- `ENV_SETUP.md` - Environment variables guide

### Must Create

- `Dockerfile` - Application containerization
- `docker-compose.yml` - Multi-container setup
- `.github/workflows/ci.yml` - CI pipeline
- `.github/workflows/release.yml` - Release workflow
- Updated `README.md` - Complete documentation

## Testing Requirements

- All tests must pass
- Minimum 60% code coverage
- Tests run in CI pipeline
- Database service configured in GitHub Actions

## Evaluation Criteria

1. **Technical Implementation (60%)**
   - Docker (20%)
   - Database (10%)
   - CI/CD (20%)
   - Security (10%)

2. **Code Quality (20%)**
   - Test coverage
   - Code formatting
   - Type safety

3. **Documentation (10%)**
   - README completeness
   - Clear instructions

4. **Best Practices (10%)**
   - Git practices
   - Project structure
   - Error handling

## Prerequisites for Students

- Docker Desktop installed
- Git installed
- GitHub account
- Basic knowledge of:
  - Docker and Docker Compose
  - PostgreSQL
  - GitHub Actions
  - Node.js and npm
  - Environment variables

## Time Allocation

- **Day 1:** 8 hours (Dockerization and Database)
- **Day 2:** 8 hours (CI/CD and Security)
- **Total:** 16 hours

## Success Criteria

A successful submission includes:

- ✅ Application runs in Docker
- ✅ Database properly configured
- ✅ All tests pass
- ✅ CI pipeline passes
- ✅ Coverage meets threshold
- ✅ Security best practices followed
- ✅ Complete documentation
- ✅ No secrets in code

## Support Resources

- Docker Documentation
- GitHub Actions Documentation
- Next.js Documentation
- PostgreSQL Documentation
- Instructor guidance

---

**This assessment is designed to evaluate practical DevOps skills at a Junior DevOps Engineer level.**
