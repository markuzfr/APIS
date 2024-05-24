import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../components/Login/Login';
import Dashboard from '../components/Dashboard/Dashboard'; 

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
   {
    path: '/dashboard',
    element: <Dashboard />,
  }, 
]);
