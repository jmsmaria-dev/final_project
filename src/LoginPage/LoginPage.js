import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { apiClient } from '../api/client';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const api = apiClient();
      const res = await api.post('/api/login', { username, password });
      login(res.data.token, res.data.user);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.error || 'Login failed');
    }
  };

  return (
    <main className="center" id="login" aria-labelledby="login-heading">
      <div className="page-area">
        <h1 id="login-heading">Login</h1>
        <form onSubmit={onSubmit} aria-describedby="login-help">
          <div>
            <label htmlFor="username">First name</label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
            />
          </div>
          <p id="login-help">Use your first name as both username and password (for testing only).</p>
          {error && <p role="alert">{error}</p>}
          <button type="submit">Sign in</button>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
