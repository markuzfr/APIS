import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import './Login.scss';
import { authentification } from '../../api/apiCalls';

const Login = () => {
  const [formData, setFormData] = useState({
    _username: '',
    _password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [serverUrl, setServerUrl] = useState(localStorage.getItem('serverUrl') || '');
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [wrongLogin, setWrongLogin] = useState('');

  const isFormValid = formData._password && formData._username;

  const handleScan = (data) => {
    if (data) {
      setServerUrl(data.text);
      setIsScanning(false);
    }
  };
  
  const handleSaveServerUrl = () => {
    localStorage.setItem('serverUrl', serverUrl);
    setIsSettingsOpen(false);
  };

  const handleError = (err) => {
    console.error(err);
    setCameraError('Prosím povoľte prístup ku kamere.');
  };  

  const handleInputChange = event => {
    const { value } = event.target;
    const a = '_';
    setFormData({
      ...formData,
      [a + event.target.id]: value,
    });
    setWrongLogin('');
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await authentification(formData);

      if (!response.ok) {
        console.debug('Failed to authenticate:', response.statusText);
        throw new Error('Failed to authenticate');
        
      }
      
      console.debug('Authentication successful:');
      localStorage.setItem('isAuthenticated', 'true');
      window.location.href = '/Dashboard';
      
    } catch (error) {
      setWrongLogin('Zlé prihlasovacie meno alebo heslo!');
      console.error('Error during authentication:', error);
    }
  };
  localStorage.setItem('isAuthenticated', 'false');
  
  return (
    <>
      <div className='top-text'> 
        <h1>webReader mobile 1.4.2</h1>
      </div>
      <div className="login-container">
        {serverUrl && <p className='shownServerURL'>{serverUrl}</p>}
        <form onSubmit={handleSubmit}> 
          <div className="form-group-username">
            <img className="username-icon" src={'/imgs/person.png'} alt="Username" />
            <input 
              type="text"
              placeholder='Prihlasovacie meno'
              id="username"
              value={formData._username}
              onChange={handleInputChange } 
            />
          </div>
          <div className="form-group-password">
            <img className="password-icon" src={'/imgs/lock.png'} alt="Password" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Heslo'
              id="password"
              value={formData._password}
              onChange={handleInputChange } 
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
          <div className='loginError'>
            {wrongLogin && <p className='wrongLoginError'>{wrongLogin}</p>}
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
              <button onClick={handleSaveServerUrl}>Uložiť</button>
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
                    style={{ width: '100%', borderRadius: '15px' }}
                    constraints={{ video: { facingMode: 'environment' } }}
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