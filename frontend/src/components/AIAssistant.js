import React, { useState, useRef, useEffect } from 'react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your PowerGuard AI assistant. How can I help you with energy conservation or outage preparedness today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef(null);

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('outage') || lowerMessage.includes('blackout')) {
      return "During an outage, first check if it's only in your home by looking at neighbors' lights. If it's widespread, check our outage alerts section for updates. Unplug sensitive electronics to protect them from power surges when electricity returns.";
    } else if (lowerMessage.includes('save') || lowerMessage.includes('conserve') || lowerMessage.includes('reduce')) {
      return "To save energy: 1) Use LED bulbs, 2) Set AC to 24°C, 3) Unplug devices when not in use, 4) Use natural light when possible, 5) Run full loads in washing machines and dishwashers. Small changes can reduce your bill by up to 20%!";
    } else if (lowerMessage.includes('safety') || lowerMessage.includes('emergency')) {
      return "Important safety tips: Keep flashlights handy (not candles), have a battery-powered radio, know how to manually open your garage door, and keep phones charged. Create an emergency kit with water, non-perishable food, and first aid supplies.";
    } else if (lowerMessage.includes('generator')) {
      return "If using a generator: Always place it outdoors away from windows to prevent carbon monoxide poisoning. Never plug it directly into home wiring - use extension cords. Turn it off before refueling. Follow manufacturer instructions carefully.";
    } else {
      return "I'm here to help with energy conservation and outage preparedness. You can ask me about saving electricity, what to do during blackouts, safety measures, or using generators safely. What specific information are you looking for?";
    }
  };

  const sendMessage = () => {
    if (inputValue.trim()) {
      const userMessage = { text: inputValue, isUser: true };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');

      setTimeout(() => {
        const response = getBotResponse(inputValue);
        const botMessage = { text: response, isUser: false };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "You can ask me about: saving energy, outage preparedness, safety tips, or using generators.",
        isUser: false
      }]);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <section className="ai-assistant" id="ai">
      <div className="container">
        <div className="section-title">
          <h2>AI Energy Assistant</h2>
          <p>Get personalized advice for energy conservation and outage preparedness</p>
        </div>
        <div className="assistant-container">
          <div className="chat-container" ref={chatContainerRef}>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about energy saving tips..."
            />
            <button className="btn" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;