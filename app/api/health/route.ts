import { NextResponse } from 'next/server';
import { getDbPool, hasDatabaseConfig } from '@/lib/db';

export async function GET() {
  try {
    if (!hasDatabaseConfig()) {
      return NextResponse.json({
        status: 'healthy',
        database: 'not_configured',
        message: 'Database not configured. UI is available but API endpoints require database.',
        timestamp: new Date().toISOString(),
      });
    }

    const pool = getDbPool();
    await pool.query('SELECT 1');
    
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        database: 'disconnected',
        message: 'Database connection failed. Please check your DATABASE_URL configuration.',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}

