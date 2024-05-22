import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [serverUrl, setServerUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState('');

  const isFormValid = username && password;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      setError('All fields are required');
      return;
    }

    setError('');
    onLogin();
  };

  const handleScan = (data) => {
    if (data) {
      setServerUrl(data.text);
      setIsScanning(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setCameraError('Prosím povoľte prístup ku kamere.');
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
            <img className="username-icon" src={'/imgs/person.png'} alt="Username" />
            <input 
              type="text"
              placeholder='Prihlasovacie meno'
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group-password">
            <img className="password-icon" src={'/imgs/lock.png'} alt="Password" />
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
                src={showPassword ? '/imgs/closed_eye.png' : '/imgs/opened_eye.png'} 
                alt={showPassword ? 'Hide password' : 'Show password'}
              />
            </button>
          </div>
          <div className='autoSign'>
            <h4>Prihlásiť automaticky</h4>
            <input type='checkbox'/>
          </div>
          <button type="submit" className='confirmButton' disabled={!isFormValid}>PRIHLÁSIŤ</button>
        </form>
      </div>

      <div className='settingsBox' onClick={() => setIsSettingsOpen(true)}>
        <img src="/imgs/cog.png" alt="Settings" />
      </div>

      {isSettingsOpen && (
        <div className="settings-modal">
          <div className="settings-content">
            <h2>Nastavenia</h2>
            <input 
              type="text"
              placeholder='Zadajte URL adresu'
              value={serverUrl}
              onChange={(event) => setServerUrl(event.target.value)}
            />
            <div className="settings-buttons">
              <button onClick={() => { /* TODO */ }}>Save</button>
              <button onClick={() => setIsSettingsOpen(false)}>Zatvoriť</button>
              <button onClick={() => setIsScanning(!isScanning)}>QR Kód</button>
            </div>
            {isScanning && (
              <div className="qr-reader-container">
                {navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? (
                  <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                  />
                ) : (
                  <p className="error">Zapnite prístup ku kamere.</p>
                )}
                {cameraError && <p className="error">{cameraError}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
