import React, { useState, useRef, useEffect } from 'react';
import './SpaceBot.css';

const SpaceBot = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m SpaceBot, your AI learning assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initialize Chatbase when component mounts
    if (window.chatbase) {
      window.chatbase("sendMessage", { 
        message: "Hi! I'm your personal student counselor. Ask me anything about careers, courses, or college life!" 
      });
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      // Add user message
      const userMessage = {
        type: 'user',
        content: input.trim()
      };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);
      setError(null);

      // Send message to Chatbase
      if (window.chatbase) {
        window.chatbase("sendMessage", { message: input.trim() });
      }

      // Simulate bot response (replace with actual API call)
      setTimeout(() => {
        try {
          const botResponse = {
            type: 'bot',
            content: getBotResponse(input.trim())
          };
          setMessages(prev => [...prev, botResponse]);
        } catch (err) {
          setError('Sorry, I encountered an error. Please try again.');
          console.error('Error generating bot response:', err);
        } finally {
          setIsTyping(false);
        }
      }, 1000);
    } catch (err) {
      setError('Sorry, something went wrong. Please try again.');
      console.error('Error handling message:', err);
      setIsTyping(false);
    }
  };

  const getBotResponse = (message) => {
    try {
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return 'Hello! How can I assist you with your learning journey today?';
      }
      if (lowerMessage.includes('help')) {
        return 'I can help you with:\n- Study planning\n- Course recommendations\n- Learning strategies\n- Progress tracking\nWhat would you like to know more about?';
      }
      if (lowerMessage.includes('study') || lowerMessage.includes('learn')) {
        return 'Great! Let\'s make your learning journey effective. Would you like to:\n1. Create a study plan\n2. Get learning tips\n3. Find recommended courses';
      }
      if (lowerMessage.includes('thank')) {
        return 'You\'re welcome! Feel free to ask if you need anything else.';
      }
      
      return 'I understand you\'re interested in learning. Could you please provide more details about what you\'d like to know?';
    } catch (err) {
      console.error('Error in getBotResponse:', err);
      throw new Error('Failed to generate response');
    }
  };

  const toggleChat = () => {
    if (window.chatbase) {
      window.chatbase("toggleChat");
    }
  };

  return (
    <div className="spacebot-container">
      <div className="chat-header">
        <h1>SpaceBot</h1>
        <p>Your AI Learning Assistant</p>
        <button onClick={toggleChat} className="toggle-chat-btn">
          Toggle Chat Widget
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="message-content">
              {message.type === 'bot' && (
                <div className="bot-avatar">
                  <i className="fas fa-robot"></i>
                </div>
              )}
              <div className="message-text">
                {message.content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message bot">
            <div className="message-content">
              <div className="bot-avatar">
                <i className="fas fa-robot"></i>
              </div>
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="message error">
            <div className="message-content">
              <div className="message-text error-text">
                {error}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isTyping}
        />
        <button type="submit" disabled={isTyping}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default SpaceBot; 