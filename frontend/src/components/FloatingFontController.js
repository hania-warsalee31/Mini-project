import React, { useState, useEffect } from 'react';

const FloatingFontController = () => {
  const [fontSize, setFontSize] = useState(100);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('preferredFontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    const savedSize = localStorage.getItem('preferredFontSize');
    if (savedSize) setFontSize(parseInt(savedSize));
  }, []);

  const increaseFont = () => fontSize < 150 && setFontSize(fontSize + 10);
  const decreaseFont = () => fontSize > 70 && setFontSize(fontSize - 10);
  const resetFont = () => setFontSize(100);

  return (
    <div className="floating-font-controller">
      {/* Main floating button */}
      <button 
        className="floating-main-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility options"
      >
        <i className="fas fa-text-height"></i>
      </button>

      {/* Controls panel that appears when open */}
      {isOpen && (
        <div className="floating-controls-panel">
          <div className="font-control-header">
            <h4>Text Size</h4>
            <button 
              className="close-panel-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close panel"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="font-controls">
            <button 
              onClick={decreaseFont} 
              disabled={fontSize <= 70}
              className="font-control-btn"
              aria-label="Decrease text size"
            >
              <i className="fas fa-minus"></i>
            </button>
            
            <span className="font-size-display">{fontSize}%</span>
            
            <button 
              onClick={increaseFont} 
              disabled={fontSize >= 150}
              className="font-control-btn"
              aria-label="Increase text size"
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
          
          <button 
            onClick={resetFont}
            className="font-reset-btn"
            aria-label="Reset text size to default"
          >
            <i className="fas fa-undo"></i>
            Reset Size
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingFontController;