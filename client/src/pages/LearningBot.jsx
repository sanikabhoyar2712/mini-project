import React, { useState, useRef, useEffect } from 'react';
import './LearningBot.css';

const LearningBot = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hi! I'm your Learning Path Guide. I can help you with:\n• Career guidance\n• Skill development\n• Learning resources\n• Study techniques\n• Goal setting\n\nWhat would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Predefined responses for different topics
  const responses = {
    career: {
      keywords: ['career', 'job', 'profession', 'work', 'employment'],
      response: "For career guidance, I can help you with:\n• Career assessment\n• Industry trends\n• Required skills\n• Growth opportunities\n• Work-life balance\n\nWhat specific aspect would you like to explore?"
    },
    skills: {
      keywords: ['skill', 'learn', 'develop', 'improve', 'ability'],
      response: "Here are some ways to develop your skills:\n• Online courses (Coursera, Udemy)\n• Practice projects\n• Mentorship programs\n• Workshops and seminars\n• Reading and research\n\nWhich skill would you like to focus on?"
    },
    resources: {
      keywords: ['resource', 'material', 'book', 'course', 'website'],
      response: "Here are some great learning resources:\n• Online platforms (Coursera, edX, Khan Academy)\n• Books and e-books\n• YouTube tutorials\n• Podcasts\n• Professional communities\n\nWhat type of resource are you looking for?"
    },
    study: {
      keywords: ['study', 'learn', 'memorize', 'understand', 'exam'],
      response: "Here are effective study techniques:\n• Pomodoro method\n• Active recall\n• Spaced repetition\n• Mind mapping\n• Group study\n\nWhich technique would you like to know more about?"
    },
    goals: {
      keywords: ['goal', 'target', 'aim', 'objective', 'plan'],
      response: "For setting effective goals:\n• Use SMART framework\n• Break down into smaller tasks\n• Track progress regularly\n• Celebrate milestones\n• Adjust as needed\n\nWhat's your main goal?"
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      content: input
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot typing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find matching response
    let botResponse = "I'm not sure about that. Could you rephrase or ask about career guidance, skills, resources, study techniques, or goal setting?";
    
    const userInput = input.toLowerCase();
    for (const [topic, data] of Object.entries(responses)) {
      if (data.keywords.some(keyword => userInput.includes(keyword))) {
        botResponse = data.response;
        break;
      }
    }

    // Add bot response
    setMessages(prev => [...prev, {
      type: 'bot',
      content: botResponse
    }]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="learning-bot-container">
      <div className="chat-header">
        <h1>Learning Path Guide</h1>
        <p>Your AI companion for educational guidance</p>
      </div>

      <div className="chat-container">
        <div className="messages-container">
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
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            rows="1"
          />
          <button onClick={handleSend} disabled={!input.trim()}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>

      <div className="quick-suggestions">
        <h3>Quick Questions</h3>
        <div className="suggestion-buttons">
          <button onClick={() => setInput("How can I improve my study habits?")}>
            Study Tips
          </button>
          <button onClick={() => setInput("What skills should I learn?")}>
            Skill Development
          </button>
          <button onClick={() => setInput("How do I set learning goals?")}>
            Goal Setting
          </button>
          <button onClick={() => setInput("What are good learning resources?")}>
            Learning Resources
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningBot; 