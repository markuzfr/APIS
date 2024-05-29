import React, { useState, useEffect } from 'react';
import './Login.scss';
import { authentification } from '../../api/apiCalls.ts';
import Settings from '../Settings/Settings.tsx';
const Login = () => {
  const [formData, setFormData] = useState({
    _username: '',
    _password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  
  const [settings, setSettings] = useState({
    serverUrl: localStorage.getItem('serverUrl') || '',
    isSettingsOpen: false,
    isScanning: false,
    cameraError: ''
  });

  const [loginData, setLoginData] = useState({
    wrongLogin: '',
    autoLogin: false
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem('autoLoginUsername');
    const storedAutoLogin = localStorage.getItem('autoLogin') === 'true';

    if (storedUsername) {
      setFormData({
        _username: storedUsername,
        _password: ''
      });
    }
    if(storedAutoLogin) setLoginData(prevData => ({
      ...prevData,
      autoLogin: storedAutoLogin
    }));
  }, []);

  const isFormValid = formData._password && formData._username;

  const handleScan = (data) => {
    if (data) {
      setSettings(prevSettings => ({
        ...prevSettings,
        serverUrl: data.text,
        isScanning: false
      }));
    }
  };
  
  const handleSaveServerUrl = () => {
    localStorage.setItem('serverUrl', settings.serverUrl);
    setSettings(prevSettings => ({
      ...prevSettings,
      isSettingsOpen: false
    }));
  };

  const handleError = (err) => {
    console.error(err);
    setSettings(prevSettings => ({
      ...prevSettings,
      cameraError: 'Prosím povoľte prístup ku kamere.'
    }));
  };  

  const handleInputChange = event => {
    const { value } = event.target;
    const a = '_';
    setFormData({
      ...formData,
      [a + event.target.id]: value,
    });
    setLoginData(prevData => ({
      ...prevData,
      wrongLogin: ''
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await authentification(formData, settings.serverUrl);

      if (!response.ok) {
        console.debug('Failed to authenticate:', response.statusText);
        throw new Error('Failed to authenticate');
      }
      
      console.debug('Authentication successful:');
      localStorage.setItem('isAuthenticated', 'true');
      window.location.href = '/Dashboard';

      if(loginData.autoLogin){
        localStorage.setItem('autoLoginUsername', formData._username);
        localStorage.setItem('autoLogin', 'true');
      } else {
        localStorage.removeItem('autoLoginUsername');
        localStorage.setItem('autoLogin', 'false');
      }
    } catch (error) {
      setLoginData(prevData => ({
        ...prevData,
        wrongLogin: 'Zlé prihlasovacie meno alebo heslo!'
      }));
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
        {settings.serverUrl && <p className='shownServerURL'>{settings.serverUrl}</p>}
        <form onSubmit={handleSubmit}> 
          <div className="form-group-username">
            <img className="username-icon" src={'/imgs/person.png'} alt="Username" />
            <input 
              type="text"
              placeholder='Prihlasovacie meno'
              id="username"
              value={formData._username}
              onChange={handleInputChange} 
            />
          </div>
          <div className="form-group-password">
            <img className="password-icon" src={'/imgs/lock.png'} alt="Password" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Heslo'
              id="password"
              value={formData._password}
              onChange={handleInputChange} 
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
            {loginData.wrongLogin && <p className='wrongLoginError'>{loginData.wrongLogin}</p>}
          </div>
          <div className='autoSign'>
            <h4>Prihlásiť automaticky</h4>
            <input type='checkbox' checked={loginData.autoLogin}
                onChange={() => setLoginData(prevData => ({
                ...prevData,
                autoLogin: !prevData.autoLogin
              }))}/>
          </div>
          <button type="submit" className='confirmButton' disabled={!isFormValid}>PRIHLÁSIŤ</button>
        </form>
      </div>

      <div className='settingsBox' onClick={() => setSettings(prevSettings => ({
        ...prevSettings,
        isSettingsOpen: true
      }))}>
        <img src="/imgs/cog.png" alt="Settings" />
      </div>

      {settings.isSettingsOpen && (
        <Settings 
          settings={settings} 
          setSettings={setSettings} 
          handleSaveServerUrl={handleSaveServerUrl} 
          handleScan={handleScan} 
          handleError={handleError} 
        />
      )}
    </>
  );
};

export default Login;
