import React, { useState } from 'react';
import './Login.css';



const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const isFormValid = username && password;

  const handleSubmit = (event) => {
      event.preventDefault();
    if (!isFormValid) {
      setError('All fields are required');
      return;
    }

    console.log('Email:', username);
    console.log('Password:', password);

    setError(''); 
    onLogin();
  };

  return (
    <>
      <div className='top-text'> 
        <h1>webReader mobile 1.4.2</h1>
      </div>
    
    
    <div className="login-container">

      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group-username">
         <input 
            type="text"
            placeholder='Prihlasovacie meno'
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group-password">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Heslo'
            id="password"
            value={password}  
            onChange={(event) => setPassword(event.target.value)}
          />
          <button 
            type="button" 
            className="show-password-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            <img 
              src={showPassword ? 'https://cdn-icons-png.flaticon.com/512/565/565655.png' : 'https://cdn-icons-png.flaticon.com/512/159/159604.png'} 
              alt={showPassword ? 'Hide password' : 'Show password'}
            />
          </button>
        </div>
        <div className='autoSign'>
          <h5>Prihlásiť automaticky</h5>
          <input type='checkbox'/>
        </div>
        <button type="submit" className='confirmButton' disabled={!isFormValid}>Login</button>
      </form>
    </div>
    </>
  );
};

export default Login;
