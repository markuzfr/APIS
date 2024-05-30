import React, { useEffect, useState } from "react";
import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarPosition, setSidebarPosition] = useState(0);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/";
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setSidebarPosition(sidebarOpen ? 0:170)
  };
  return (
    <div className="main">
        <div className="navbar">
        <div className="navbar-content">
          <div className="navbar-user" onClick={toggleSidebar} style={{ transform: `translateX(${sidebarPosition}px)` }}>
            <p>hehe</p>
          </div>
          <button onClick={handleLogout}>Odhlásiť</button>
        </div>
      <div className={`sidebar ${sidebarOpen ? "" : "hidden"}`}>
        <ul>
          <li>Button 1</li>
          <li>Button 2</li>
          <li>Button 3</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
          <li>Name 1</li>
        </ul>
      </div>
      </div>
      <div className="dashboard-container">
        <div className="time-display">
          <h1>
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </h1>
          <p>{currentTime.toLocaleDateString("sk-SK")}</p>
        </div>
        <div className="action-container">
          <div className="note-section">
            <div className="last-action">
              <span>&#8635;</span>
              <div className="last-action-text">Práca / Odchod</div>
              <div className="last-action-time">time/date</div>
            </div>
            <button>Pridať poznámku</button>
          </div>
          <div className="text-input-section">
            <p>Poznámka</p>
            <input type="text" />
          </div>
          <div className="action-border">
            <h3 className="action-name">Práca</h3>
            <div className="action-section">
              <button>Príchod</button>
              <button>Odchod</button>
            </div>
          </div>
          <div className="button-grid">
            <div className="button-row">
              <div className="button-grid-image">
                <img
                  src="https://dochadzka.top/demoap/images/icons_breaks/9.png"
                  alt=""
                />
              </div>
              <div className="button-grid-right">
                <div className="button-label">Služobne</div>
                <div className="button-grid-buttons">
                  <button className="green-button">Začiatok</button>
                  <button className="red-button">Koniec</button>
                </div>
              </div>
            </div>
            <div className="button-row">
              <div className="button-grid-image">
                <img
                  src="https://dochadzka.top/demoap/images/icons_breaks/9.png"
                  alt=""
                />
              </div>
              <div className="button-grid-right">
                <div className="button-label">Súkromne</div>
                <div className="button-grid-buttons">
                  <button className="green-button">Začiatok</button>
                  <button className="red-button">Koniec</button>
                </div>
              </div>
            </div>
            <div className="button-row">
              <div className="button-grid-image">
                <img
                  src="https://dochadzka.top/demoap/images/icons_breaks/9.png"
                  alt=""
                />
              </div>
              <div className="button-grid-right">
                <div className="button-label">Lekár</div>
                <div className="button-grid-buttons">
                  <button className="green-button">Začiatok</button>
                  <button className="red-button">Koniec</button>
                </div>
              </div>
            </div>
            <div className="button-row">
              <div className="button-grid-image">
                <img
                  src="https://dochadzka.top/demoap/images/icons_breaks/9.png"
                  alt=""
                />
              </div>
              <div className="button-grid-right">
                <div className="button-label">Paragraf</div>
                <div className="button-grid-buttons">
                  <button className="green-button">Začiatok</button>
                  <button className="red-button">Koniec</button>
                </div>
              </div>
            </div>
            <div className="button-row">
              <div className="button-grid-image">
                <img
                  src="https://dochadzka.top/demoap/images/icons_breaks/9.png"
                  alt=""
                />
              </div>
              <div className="button-grid-right">
                <div className="button-label">Pošta</div>
                <div className="button-grid-buttons">
                  <button className="green-button">Začiatok</button>
                  <button className="red-button">Koniec</button>
                </div>
              </div>
            </div>
            <div className="button-row">
              <div className="button-grid-image">
                <img
                  src="https://dochadzka.top/demoap/images/icons_breaks/9.png"
                  alt=""
                />
              </div>
              <div className="button-grid-right">
                <div className="button-label">Služobná cesta</div>
                <div className="button-grid-buttons">
                  <button className="green-button">Začiatok</button>
                  <button className="red-button">Koniec</button>
                </div>
              </div>
            </div>
            <div className="button-row">
              <div className="button-grid-image">
                <img
                  src="https://dochadzka.top/demoap/images/icons_breaks/9.png"
                  alt=""
                />
              </div>
              <div className="button-grid-right">
                <div className="button-label">Sprevádzanie člena rodiny</div>
                <div className="button-grid-buttons">
                  <button className="green-button">Začiatok</button>
                  <button className="red-button">Koniec</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
