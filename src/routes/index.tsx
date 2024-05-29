import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../components/Login/Login.tsx';
import Dashboard from '../components/Dashboard/Dashboard.tsx'; 

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
