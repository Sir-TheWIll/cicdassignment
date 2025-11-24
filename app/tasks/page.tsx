'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '../globals.css';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
}

export default function Tasks() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (response.status === 401) {
        router.push('/login');
        return;
      }
      const data = await response.json();
      if (response.ok) {
        setTasks(data);
      } else {
        setError(data.error || 'Failed to fetch tasks');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ title: '', description: '', status: 'pending', priority: 'medium' });
        setShowForm(false);
        fetchTasks();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create task');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTasks();
      } else {
        setError('Failed to delete task');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>My Tasks</h1>
        <nav className="nav">
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            {showForm ? 'Cancel' : 'New Task'}
          </button>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </nav>
      </div>

      {error && <div className="error" style={{ marginBottom: '20px' }}>{error}</div>}

      {showForm && (
        <div className="card" style={{ marginBottom: '30px' }}>
          <h3>Create New Task</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Create Task
            </button>
          </form>
        </div>
      )}

      <div>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>
          Tasks ({tasks.length})
        </h2>
        {tasks.length === 0 ? (
          <div className="card">
            <p>No tasks yet. Create your first task!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3>{task.title}</h3>
                  {task.description && <p>{task.description}</p>}
                  <div style={{ marginTop: '10px' }}>
                    <span className={`badge badge-${task.status.replace('_', '-')}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                    <span className={`badge badge-${task.priority}`}>
                      {task.priority}
                    </span>
                  </div>
                  <small style={{ color: '#999' }}>
                    Created: {new Date(task.created_at).toLocaleDateString()}
                  </small>
                </div>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="btn btn-danger"
                  style={{ marginLeft: '15px' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

