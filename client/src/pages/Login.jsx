import React, { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUserShield, FaEye, FaEyeSlash, FaLock, FaExclamationCircle } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect admins straight to the dashboard. Only admins are redirected so a
  // non-admin session cannot bounce between here and the RequireAdmin guard.
  if (user && user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-theme admin-login-wrap">
      <div className="admin-login-card">
        <div className="admin-login-head">
          <div className="admin-login-icon">
            <FaUserShield />
          </div>
          <p className="admin-login-eyebrow">Restricted Area</p>
          <h1 className="admin-login-title">Admin Login</h1>
          <p className="admin-login-sub">Sign in to manage your portfolio.</p>
        </div>

        <div className="admin-login-body">
          {error && (
            <div className="admin-login-alert" role="alert">
              <FaExclamationCircle /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="admin-login-field admin-field">
              <label htmlFor="login-email" className="admin-label">Email address</label>
              <input
                id="login-email"
                type="email"
                className="admin-input"
                autoComplete="username"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="admin-login-field admin-field">
              <label htmlFor="login-password" className="admin-label">Password</label>
              <div className="admin-input-group">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="admin-input"
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="admin-input-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-global btn-global-primary admin-login-submit"
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating…' : 'Login to Admin'}
            </button>
          </form>

          <p className="admin-login-foot">
            <FaLock size={11} /> Protected area — authorized access only
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
