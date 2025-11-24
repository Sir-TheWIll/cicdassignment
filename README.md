# Task Manager Application - CI/CD Assessment

> **Note for Students:** This is the base application for your CI/CD and Docker assessment. Please refer to `ASSESSMENT.md` for detailed instructions on what you need to do.

## Quick Start (For Reference Only)

This application is **NOT** ready to run out of the box. You need to:

1. Create Dockerfiles
2. Set up database with Docker
3. Configure environment variables
4. Set up CI/CD pipeline

See `ASSESSMENT.md` for complete instructions.

## Application Overview

A full-stack Task Manager application built with:
- **Next.js 14** (App Router)
- **TypeScript**
- **PostgreSQL** database
- **JWT** authentication
- **Zod** validation

## Features

- User registration and authentication
- Task creation and management
- Task status tracking (pending, in_progress, completed)
- Task priority levels (low, medium, high)
- Secure password hashing
- Input validation

## Project Structure

```
├── app/              # Next.js pages and API routes
├── lib/              # Utility functions (db, auth, validation)
├── __tests__/        # Test files
├── .env.example      # Example environment variables
└── ASSESSMENT.md     # Assessment instructions
```

## Environment Variables

See `.env.example` for required environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development, production, test)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

## Database Schema

### Users Table
- `id` (SERIAL PRIMARY KEY)
- `username` (VARCHAR, UNIQUE)
- `email` (VARCHAR, UNIQUE)
- `password_hash` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Tasks Table
- `id` (SERIAL PRIMARY KEY)
- `title` (VARCHAR)
- `description` (TEXT)
- `status` (VARCHAR: pending, in_progress, completed)
- `priority` (VARCHAR: low, medium, high)
- `user_id` (INTEGER, FOREIGN KEY)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Tasks
- `GET /api/tasks` - Get user's tasks (requires auth)
- `POST /api/tasks` - Create new task (requires auth)
- `DELETE /api/tasks/[id]` - Delete task (requires auth)
- `PATCH /api/tasks/[id]` - Update task (requires auth)

### Health
- `GET /api/health` - Health check endpoint

## Testing

Tests are located in `__tests__/` directory. Run tests with:

```bash
npm test
```

Generate coverage report:

```bash
npm run test:coverage
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation with Zod
- SQL injection prevention (parameterized queries)
- HTTP-only cookies for tokens

## Next Steps

**Students:** Please read `ASSESSMENT.md` for your assignment instructions.

---

**Good luck with your assessment! 🚀**

