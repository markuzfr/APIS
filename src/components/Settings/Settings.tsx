import React from 'react';
import QrReader from 'react-qr-scanner';

const Settings = ({ settings, setSettings, handleSaveServerUrl, handleScan, handleError }) => {
  return (
    <div className="settings-modal">
      <div className="settings-content">
        <h2>Nastavenia</h2>
        <input 
          type="text"
          placeholder='Zadajte URL adresu'
          value={settings.serverUrl}
          onChange={(event) => setSettings(prevSettings => ({
            ...prevSettings,
            serverUrl: event.target.value
          }))}
        />
        <div className="settings-buttons">
          <button onClick={handleSaveServerUrl}>Uložiť</button>
          <button onClick={() => setSettings(prevSettings => ({
            ...prevSettings,
            isSettingsOpen: false
          }))}>Zatvoriť</button>
          <button onClick={() => setSettings(prevSettings => ({
            ...prevSettings,
            isScanning: !prevSettings.isScanning
          }))}>QR Kód</button>
        </div>
        {settings.isScanning && (
          <div className="qr-reader-container">
            {navigator.mediaDevices ? (
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
            {settings.cameraError && <p className="error">{settings.cameraError}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
