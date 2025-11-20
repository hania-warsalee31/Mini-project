import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-bolt"></i>
            <h1>PowerGuard Mauritius</h1>
          </div>
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </button>
          <nav>
            <ul className={menuOpen ? 'show' : ''}>
              <li><a href="#home">Home</a></li>
              <li><a href="#alerts">Outage Alerts</a></li>
              <li><a href="#safety">Safety Tips</a></li>
              <li><a href="#quiz">Energy Quiz</a></li>
              <li><a href="#reserve">Energy Reserve</a></li>
              <li><a href="#ai">AI Assistant</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;