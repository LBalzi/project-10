import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { authenticatedUser } = useAuth();

  return authenticatedUser ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;