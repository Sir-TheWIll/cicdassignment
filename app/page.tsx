import Link from 'next/link';
import './globals.css';

export default function Home() {
  return (
    <div className="container">
      <div className="header">
        <h1>Task Manager Application</h1>
        <nav className="nav">
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
          <Link href="/register" className="btn btn-secondary">
            Register
          </Link>
        </nav>
      </div>
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '20px', color: '#333' }}>
          Welcome to Task Manager
        </h2>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
          A comprehensive task management system for organizing your work
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link href="/register" className="btn btn-primary" style={{ fontSize: '16px', padding: '12px 30px' }}>
            Get Started
          </Link>
          <Link href="/login" className="btn btn-secondary" style={{ fontSize: '16px', padding: '12px 30px' }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

