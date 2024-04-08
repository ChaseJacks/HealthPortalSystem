//This is a copy of DoctorChat, modified slightly for a patient experience
//Rafael Alfonso

import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../landing-page/getLPTheme';
import CssBaseline from '@mui/material/CssBaseline';
import PatientChatAppBar from '../Menu Bars/PatientBars/PatientChatAppBar';
import ListOfDoctorsForChat from './ListOfDoctorsForChat';
import { List } from 'survey-react';

function Sidebar({ people, onSelectPerson }) {
  return (
    <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '20px' }}>
      <h2>People</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {people.map((person, index) => (
          <li key={index} style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={() => onSelectPerson(person)}>
            {person.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DisplayDoctors() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const people = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
    // Add more people as needed
  ];

  const handleSelectPerson = (person) => {
    setSelectedPerson(person);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar people={people} onSelectPerson={handleSelectPerson} />
      {selectedPerson && <PatientChat person={selectedPerson} />}
    </div>
  );
}

function PatientChat() {
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
        sender: 'user',
        attachment: attachment
      };
      setMessages([...messages, newMessage]);
      setInputText('');//because of this, the request doesn't show the text sent
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
      <ListOfDoctorsForChat />*/
      {/*<DisplayDoctors />*/}
      <PatientChatAppBar mode={mode} toggleColorMode={toggleColorMode} />
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
                  <form action={`/create/msg/`}//${localStorage.getItem("userTypeID")}/${selectedDoctor.DoctorID}`}
                      method="post"
                      encType="multipart/form-data"
                      target="hiddenFrame">
                      

                      <input name="attachment" type="file" onChange={handleAttachmentChange} style={{ marginRight: '10px' }} />
                      <input name="msg" value={inputText} type="text" onChange={(e) => setInputText(e.target.value)} style={{ flex: '1', marginRight: '10px', padding: '5px' }}/>
                      {/*msg will always send to the request what is in the inputText field; it does not store. So even tho inputText is being reset
                      after it's sent, since it gets reset at the end, the request receives ''
                      However, you want message to be tracking what's being inputted. So it's value must be inputText. But it needs to send what was sent */}
                      <input name="submit" type="submit" onClick={handleMessageSend} style={{ padding: '5px 10px', cursor: 'pointer' }} value="Send" />
                  </form>
      </div>
          </div>



          <iframe name="hiddenFrame" width="0" height="0" border="0" style={{ display: "none" }}></iframe>
    </ThemeProvider>
  );
}

export default PatientChat;
