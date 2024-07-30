import React from 'react';
import Chatbot from './components/Chatbot';
import './App.css';
import { ThemeProvider } from './components/ThemeContext';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
      <Chatbot />
      </ThemeProvider>
      
    </div>
  );
}

export default App;
