import React from 'react';
import reportWebVitals from '../reportWebVitals'; // Correct path
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../Login/Login';
/* import Dashboard from '../Dashboard/Dashboard'; // Correct path */

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
/*   {
    path: '/dashboard',
    element: <Dashboard />,
  }, */
]);

reportWebVitals();