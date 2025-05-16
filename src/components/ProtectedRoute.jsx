import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles }) {
  const loginStatus = localStorage.getItem('LOGIN_SUCCESS');
  const userInfo = loginStatus ? JSON.parse(loginStatus) : null;

  // Check if the user is logged in and has the required role
  if (!userInfo || !allowedRoles.includes(userInfo.user_role)) {
    alert('You do not have permission to access this page.');
    return <Navigate to="/login" replace />;
  }

  return children;
}