# Running the App Without Database (UI Preview)

You can run the application locally to see the UI without setting up a database. The frontend pages will work, but API endpoints will return errors until the database is configured.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create a minimal .env file:**
   ```bash
   # Create .env file (you can skip DATABASE_URL for now)
   echo "JWT_SECRET=dev-secret-key-for-ui-preview-only" > .env
   ```

   Or create `.env` manually with:
   ```bash
   JWT_SECRET=dev-secret-key-for-ui-preview-only
   NODE_ENV=development
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## What Works Without Database

✅ **Frontend Pages:**
- Home page (`/`)
- Login page (`/login`)
- Register page (`/register`)
- Tasks page (`/tasks`) - UI will load, but won't show data

✅ **Health Check:**
- `/api/health` - Will show "database: not_configured" status

## What Doesn't Work Without Database

❌ **API Endpoints:**
- `/api/auth/register` - Will return error
- `/api/auth/login` - Will return error
- `/api/tasks` - Will return error

## Testing the UI

You can:
- Navigate between pages
- See the UI design and layout
- View form structures
- Test client-side validation

## Next Steps

To make the app fully functional, you'll need to:
1. Set up PostgreSQL database (see `ASSESSMENT.md`)
2. Add `DATABASE_URL` to `.env` file
3. Restart the development server

## Example .env for UI Preview

```bash
# Minimal .env for UI preview (no database)
JWT_SECRET=dev-secret-key-for-ui-preview-only
NODE_ENV=development
```

## Example .env with Database

```bash
# Full .env with database (for full functionality)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/taskmanager
JWT_SECRET=dev-secret-key-change-in-production
NODE_ENV=development
```

---

**Note:** This is useful for previewing the UI before setting up Docker and the database. For the full assessment, you'll need to complete the Docker setup as described in `ASSESSMENT.md`.

