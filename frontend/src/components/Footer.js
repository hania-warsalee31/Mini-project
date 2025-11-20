import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>PowerGuard Mauritius</h3>
            <p>Your trusted companion for electricity outage information and energy conservation in Mauritius.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#alerts">Outage Alerts</a></li>
              <li><a href="#safety">Safety Tips</a></li>
              <li><a href="#quiz">Energy Quiz</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li><a href="#">Emergency Contacts</a></li>
              <li><a href="#">Energy Saving Guide</a></li>
              <li><a href="#">Report an Outage</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul>
              <li><i className="fas fa-phone"></i> +230 123 4567</li>
              <li><i className="fas fa-envelope"></i> info@powerguardmu.org</li>
              <li><i className="fas fa-map-marker-alt"></i> Port Louis, Mauritius</li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2023 PowerGuard Mauritius. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;