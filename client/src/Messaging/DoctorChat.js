//Rafael Alfonso

import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../landing-page/getLPTheme';
import CssBaseline from '@mui/material/CssBaseline';
import DoctorChatAppBar from '../Menu Bars/DoctorBars/DoctorChatAppBar';

function DoctorChat() {
  const [mode, setMode] = React.useState('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const [patients, setPatients] = React.useState([]);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };
  
  
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [attachment, setAttachment] = useState(null); 

  // Simulate receiving messages from a server
  useEffect(() => {
    // Replace this with actual logic to receive messages from a server
    const interval = setInterval(() => {
      const newMessage = { text: 'Hello!', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, newMessage]);
    }, 3000); // Simulate receiving a message every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleMessageSend = () => {
    if (inputText.trim() !== '' || attachment !== null) {
      const newMessage = {
          text: inputText.trim(),
          sender: localStorage.getItem("name"),
          attachment: attachment
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      setAttachment(null);
      // You can add logic here to send the message and attachment to the server or perform any other action
    }
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  const handleAttachmentClick = (message) => {
    if (message.attachment) {
      // Open the attachment (e.g., display in a new tab or download)
      window.open(URL.createObjectURL(message.attachment));
    }
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <DoctorChatAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Chat</h2>{/*Is there a way to make this the patient's name? GPT tried to have me make a prop for it outside this file*/}
      <div style={{ height: '300px', overflowY: 'auto', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '5px', textAlign: message.sender === 'user' ? 'right' : 'left' }}>
            <strong>{message.sender === 'user' ? 'You' : 'Bot'}</strong>: {message.text}
            {message.attachment && (
              <div style={{ marginTop: '5px', cursor: 'pointer', textDecoration: 'underline', color: 'blue' }} onClick={() => handleAttachmentClick(message)}>
                Attachment: {message.attachment.name} ({(message.attachment.size / 1024).toFixed(2)} KB)
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <input name="upload" type="file" onChange={handleAttachmentChange} style={{ marginRight: '10px' }} />
        <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} style={{ flex: '1', marginRight: '10px', padding: '5px' }} />
        <button onClick={handleMessageSend} style={{ padding: '5px 10px', cursor: 'pointer' }}>Send</button>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default DoctorChat;
