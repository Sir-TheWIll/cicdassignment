import { Pool } from 'pg';

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    // Determine SSL setting based on connection string and environment
    // Disable SSL for local Docker containers (postgres hostname) or development
    const useSSL =
      process.env.NODE_ENV === 'production' &&
      !connectionString.includes('@postgres:') &&
      !connectionString.includes('@localhost:');

    pool = new Pool({
      connectionString,
      ssl: useSSL ? { rejectUnauthorized: false } : false,
    });

    // Handle pool errors
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }

  return pool;
}

export function hasDatabaseConfig(): boolean {
  return !!process.env.DATABASE_URL;
}

export async function initDatabase(): Promise<void> {
  const maxRetries = 5;
  const retryDelay = 2000; // 2 seconds

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const pool = getDbPool();

      // Test connection first
      await pool.query('SELECT 1');

      // Create users table
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create tasks table
      await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          status VARCHAR(20) DEFAULT 'pending',
          priority VARCHAR(20) DEFAULT 'medium',
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create indexes for better query performance
      await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
        CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      `);

      console.log('Database initialized successfully');
      return;
    } catch (error: any) {
      if (attempt === maxRetries) {
        console.error(
          'Failed to initialize database after',
          maxRetries,
          'attempts:',
          error
        );
        throw error;
      }
      console.warn(
        `Database initialization attempt ${attempt} failed, retrying in ${retryDelay}ms...`,
        error.message
      );
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
}

export async function closeDatabase(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
