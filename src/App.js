import React from 'react';
import './App.css';
import Login from './Login/Login.js';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index.js'; // Correct import

function App() {
  return <RouterProvider router={router}/>;
}

export default App;


/* function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />}
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Welcome to the Dashboard</h2>
    </div>
  );
}

export default App;
 */