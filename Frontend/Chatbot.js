import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [firstInteraction, setFirstInteraction] = useState(true);
  const chatboxRef = useRef(null);

  const showChat = async () => {
    setChatVisible(true);

    if (firstInteraction) {
      try {
        const response = await fetch('http://localhost:5000/greet'); // Adjust URL based on your Flask server
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMessages([{ type: 'bot', text: data.bot_response }]);
        setFirstInteraction(false);
      } catch (error) {
        console.error('Error fetching greeting:', error);
      }
    }
  };

  const closeChat = () => {
    setChatVisible(false);
  };

  const sendMessage = async () => {
    if (userInput.trim() === '') {
      return;
    }

    const newMessages = [...messages, { type: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');

    try {
      const response = await fetch('http://localhost:5000/chatbot', { // Adjust URL based on your Flask server
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: userInput }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages([...newMessages, { type: 'bot', text: data.bot_response }]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollIntoView({behavior:"smooth",block:"end"});
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div id="chat-icon" onClick={showChat}>
        🗨️
      </div>
      {chatVisible && (
        <div id="chat-box">
          <div id="close-chat-btn" onClick={closeChat}>
            ✖
          </div>
          <div id="chatbox">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}-message`}>
                {message.text}
              </div>
            ))}
            <div ref={chatboxRef}/>
          </div>
          <div id="chat-input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
