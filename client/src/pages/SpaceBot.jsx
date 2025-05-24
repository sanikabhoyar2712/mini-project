import React, { useEffect } from 'react';
import './SpaceBot.css';

const SpaceBot = () => {
  useEffect(() => {
    // Initialize Chatbase configuration
    const script1 = document.createElement("script");
    script1.innerHTML = `
      window.chatbaseConfig = {
        chatbotId: "OYyYnbdH7hn3dKBwW6z6k"
      };
    `;
    document.body.appendChild(script1);

    // Load Chatbase script
    const script2 = document.createElement("script");
    script2.src = "https://www.chatbase.co/embed.min.js";
    script2.defer = true;
    script2.id = "OYyYnbdH7hn3dKBwW6z6k";
    document.body.appendChild(script2);

    // Cleanup function
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="spacebot-container">
      <div className="chat-container">
        <div className="chat-header">
          <h2>SpaceBot</h2>
          <p>Your AI companion for learning and guidance</p>
        </div>
        <div className="chatbase-container">
          {/* Chatbase chatbot will be injected here */}
        </div>
      </div>
    </div>
  );
};

export default SpaceBot; 