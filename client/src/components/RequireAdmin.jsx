import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Route guard for admin-only pages. AuthProvider only renders its children once
// the initial /auth/user check has resolved, so `user` is authoritative here.
// This is a UX guard only — the backend independently enforces auth on every
// admin API, so it is never the sole line of defense.
const RequireAdmin = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  if (user.role !== 'admin') {
    // Authenticated but not an admin — send home rather than to the login page
    // to avoid a redirect loop with the login screen's own redirect.
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RequireAdmin;
