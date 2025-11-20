import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your PowerGuard AI assistant. How can I help you with energy conservation or outage preparedness in Mauritius today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const GEMINI_API_KEY = "AIzaSyB4lmI7fKnSaL5wtRky9jsltpFeop5Iymg";
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  // Configure marked options
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  const getBotResponse = async (userMessage) => {
    setIsLoading(true);

    try {
      const prompt = `You are PowerGuard AI, a specialized assistant for electricity outage management and energy conservation in Mauritius. 
- ALWAYS respond in bullet points using markdown format with * for bullets
- You can use emojis.
- Each bullet point should be concise (1 line max)
- Maximum 4-5 bullet points per response
- Provide practical, actionable advice for Mauritian residents
- Focus on energy conservation, outage management, and safety
- Be specific to Mauritius climate and CEB (Central Electricity Board)
- Keep responses concise and helpful
- Keep in mind that different aged people are using the website.

USER QUESTION: ${userMessage}

Please provide a helpful response about energy conservation, outage preparedness, or electrical safety in Mauritius.`;

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gemini-2.5-flash",
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts[0].text) {
        console.error('Invalid API response format:', data);
        throw new Error('Invalid response format from API');
      }

      const aiResponse = data.candidates[0].content.parts[0].text;
      setIsLoading(false);
      return aiResponse;

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setIsLoading(false);
      return `🔧 **API Connection Issue:**\n* ${error.message}\n* The AI service is currently unavailable\n* Please try again later`;
    }
  };

  const formatMessage = (text, isUser) => {
    if (isUser) {
      return text;
    }
    
    try {
      // Convert markdown to HTML using marked
      const html = marked.parse(text);
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return text;
    }
  };

  const sendMessage = async () => {
    if (inputValue.trim() && !isLoading) {
      const userMessage = { text: inputValue, isUser: true };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');

      const response = await getBotResponse(inputValue);
      const botMessage = { text: response, isUser: false };
      setMessages(prev => [...prev, botMessage]);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      sendMessage();
    }
  };

  return (
    <section className="ai-assistant" id="ai">
      <div className="container">
        <div className="section-title">
          <h2>AI Energy Assistant</h2>
          <p>Get AI-powered advice for energy conservation and outage preparedness in Mauritius</p>
        </div>
        <div className="assistant-container">
          <div className="chat-container" ref={chatContainerRef}>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
                {formatMessage(message.text, message.isUser)}
              </div>
            ))}
            {isLoading && (
              <div className="message bot-message">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about energy saving, outages, or safety..."
              disabled={isLoading}
            />
            <button className="btn" onClick={sendMessage} disabled={isLoading}>
              {isLoading ? 'Thinking...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;