import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUserShield } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
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
    <div className="container py-5 d-flex justify-content-center align-items-center admin-theme" style={{ minHeight: '70vh' }}>
      <div className="card border-0 shadow-lg" style={{ maxWidth: '450px', width: '100%', background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="card-header text-white text-center py-4 border-0" style={{ background: 'rgba(15,23,42,0.9)' }}>
          <FaUserShield size={40} className="mb-3 text-primary" />
          <h3 className="fw-bold mb-0">Admin Login</h3>
        </div>
        <div className="card-body p-4 p-md-5" style={{ background: 'transparent', color: 'var(--text-main)' }}>
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-medium" style={{ color: 'rgba(226,232,240,0.9)' }}>Email address</label>
              <input 
                type="email" 
                className="form-control form-control-lg" 
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: '#f8fafc' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-5">
              <label className="form-label fw-medium" style={{ color: 'rgba(226,232,240,0.9)' }}>Password</label>
              <input 
                type="password" 
                className="form-control form-control-lg" 
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: '#f8fafc' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn-global btn-global-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Login to Admin'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
