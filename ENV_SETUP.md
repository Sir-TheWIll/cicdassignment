# Environment Variables Setup Guide

## Required Environment Variables

The application requires the following environment variables to function properly:

### Database Configuration

```bash
DATABASE_URL=postgresql://username:password@host:port/database
```

**Format:** `postgresql://[user]:[password]@[host]:[port]/[database]`

**Example:**
```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/taskmanager
```

**For Docker Compose:**
```bash
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/taskmanager
```

### JWT Secret

```bash
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Important:** 
- Use a strong, random string in production
- Never commit this to version control
- Minimum 32 characters recommended

### Node Environment

```bash
NODE_ENV=development  # or 'production' or 'test'
```

## Environment Files

### Development (.env)
Create a `.env` file in the root directory:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/taskmanager
JWT_SECRET=dev-secret-key-change-in-production
NODE_ENV=development
```

### Testing (.env.test)
For running tests:

```bash
DATABASE_URL=postgresql://test:test@localhost:5432/testdb
JWT_SECRET=test-secret-key-for-testing-only
NODE_ENV=test
```

### Production
Use environment variables from your hosting platform:
- Docker: Set in `docker-compose.yml` or container environment
- Cloud platforms: Use their environment variable management
- Never hardcode secrets

## Docker Compose Environment

In `docker-compose.yml`, you can set environment variables:

```yaml
services:
  app:
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@postgres:5432/taskmanager
      - JWT_SECRET=${JWT_SECRET}
      - NODE_ENV=production
    env_file:
      - .env
```

## Security Best Practices

1. **Never commit `.env` files**
   - Add `.env` to `.gitignore`
   - Use `.env.example` as a template

2. **Use different secrets for each environment**
   - Development
   - Testing
   - Production

3. **Rotate secrets regularly**
   - Especially in production
   - After security incidents

4. **Use secret management tools**
   - GitHub Secrets (for CI/CD)
   - Docker secrets
   - Cloud provider secret managers

5. **Validate environment variables**
   - Check if required variables are set
   - Provide clear error messages

## Troubleshooting

### Issue: "DATABASE_URL environment variable is not set"

**Solution:**
- Check if `.env` file exists
- Verify variable name is correct
- Ensure `.env` is in the root directory
- Restart the application after creating `.env`

### Issue: "Connection refused" or "Cannot connect to database"

**Solution:**
- Verify database is running
- Check DATABASE_URL format
- Ensure host and port are correct
- Check network configuration in Docker

### Issue: "JWT_SECRET is not set"

**Solution:**
- Add JWT_SECRET to `.env` file
- Use a strong random string
- Restart the application

## Example .env File

```bash
# Database Configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/taskmanager

# JWT Secret Key (Change this to a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars

# Node Environment
NODE_ENV=development
```

## Generating a Secure JWT Secret

You can generate a secure random string using:

**Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**OpenSSL:**
```bash
openssl rand -hex 32
```

**Online:**
- Use a secure random string generator
- Minimum 32 characters recommended

