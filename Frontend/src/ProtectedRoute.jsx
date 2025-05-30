// ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  
  return token ? <Outlet /> : <Navigate to="/home" replace />;
};

export default ProtectedRoute;
