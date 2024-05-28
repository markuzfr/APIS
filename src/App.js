import React from 'react';
import './App.css';
//import Login from './components/Login/Login.js';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index.js'; 

function App() {
  return <RouterProvider router={router}/>;
  
}

export default App;
