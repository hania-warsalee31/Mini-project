import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-bolt"></i>
            <h1>PowerGuard Mauritius</h1>
          </div>
          
          {/* Hamburger Button */}
          <button 
            className={`hamburger-btn ${menuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation */}
          <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <ul>
              <li><a href="#home" onClick={closeMenu}>Home</a></li>
              <li><a href="#alerts" onClick={closeMenu}>Outage Alerts</a></li>
              <li><a href="#safety" onClick={closeMenu}>Safety Tips</a></li>
              <li><a href="#quiz" onClick={closeMenu}>Energy Quiz</a></li>
              <li><a href="#reserve" onClick={closeMenu}>Energy Reserve</a></li>
              <li><a href="#ai" onClick={closeMenu}>AI Assistant</a></li>
            </ul>
          </nav>

          {/* Overlay for closing menu when clicking outside */}
          {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
        </div>
      </div>
    </header>
  );
};

export default Header;