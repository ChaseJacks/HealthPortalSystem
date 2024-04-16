import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../landing-page/getLPTheme';
import CssBaseline from '@mui/material/CssBaseline';
import DoctorChatAppBar from '../Menu Bars/DoctorBars/DoctorChatAppBar';
import { viewPatients } from '../api/viewPatients';

function DoctorChat() {
  const [mode, setMode] = useState('dark');
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);

  const handlePatientSelect = async (patient) => {
      setSelectedPatient(patient);

      try {
          let myPatID = patient.PatientID;
          let myDocID = localStorage.getItem("userTypeID");

          const { msgArr } = await fetch(`/data/msg/${myPatID}/${myDocID}?num=${20}`);

          let newMessages = [];

          for (let i = 0; i < msgArr.length; i++) {
              let sender = msgArr[i].PatientAuthor ? patient.Name : 'You';
              let msg = {
                  msgID: msgArr[i].MessageID,
                  text: msgArr[i].MessageContents || "",
                  sender: sender
              };
              newMessages[i] = msg;
          }

          setMessages(newMessages);
      } catch (err) {
          console.log("Error fetching messages - " + err.message);
      }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPatientData();
        const uniquePatients = Array.from(new Set(data));
        setPatients(uniquePatients);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchPatientData = async () => {
    try {
      const patientList = await viewPatients(localStorage.getItem("userTypeID"));
      console.log('Fetched patient data:', patientList);
      return patientList;
    } catch (error) {
      console.error('Error fetching patient data:', error);
      return [];
    }
  };

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [sentText, setSentText] = useState('');
  const [attachment, setAttachment] = useState(null); 

  useEffect(() => {
      const interval = setInterval(async () => {
          if (selectedPatient) {
              let myPatID = selectedPatient.PatientID;
              let myDocID = localStorage.getItem("userTypeID");
              const { msgArr } = await fetch(`/data/msg/${myPatID}/${myDocID}?num=${10}`);

              for (let i = 0; i < msgArr.length; i++) {
                  // If it's from the patient,
                  if (msgArr.PatientAuthor) {
                      // Find out if the message is duplicated
                      let isDuplicated = false;
                      for (let j = 0; j < messages.length; j++) {
                          if (messages[j].msgID == msgArr[i].MessageID) {
                              isDuplicated = true;
                              break;
                          }
                      }

                      // If message isn't duplicated, add it to the list of messages
                      if (!isDuplicated) {
                          // Assemble the message and add
                          let newMsg = {
                              msgID: msgArr[i].MessageID,
                              text: msgArr[i].MessageContents || "",
                              sender: selectedPatient.Name
                          };
                          setMessages([...messages, newMsg]);
                      }
                  }
              }
          }
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
      setSentText( inputText );
      setInputText('');
      setAttachment(null);
    }
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  const handleAttachmentClick = (message) => {
    if (message.attachment) {
      window.open(URL.createObjectURL(message.attachment));
    }
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <div style={{ position: 'relative', zIndex: '2' }}>
        <DoctorChatAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <div style={{ position: 'relative', zIndex: '1', alignItems: 'center' }}>
          <h2>Select Patient:</h2>
          <ul>
            {patients.map(patient => (
              <li key={patient.id} onClick={() => handlePatientSelect(patient)}>
                <div>
                  <h3>{patient.PatientName}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
        { selectedPatient && (
          <div style={{ position: 'relative', zIndex: '0', maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>Chat with {selectedPatient.PatientName}</h2>
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
            <div style={{ position: 'relative', zIndex: '0', display: 'flex', marginBottom: '10px' }}>
              <form action={`/create/msg/${localStorage.getItem("userTypeID")}/${selectedPatient.PatientID}`} method="post" encType="multipart/form-data" target="hiddenFrame">
                <div>
                  {attachment ? (
                    <div>
                      <span>{attachment.name}</span>
                      <button onClick={handleRemoveAttachment}>Remove</button>
                    </div>
                  ) : (
                    <input name="attachment" type="file" onChange={handleAttachmentChange} />
                  )}
                </div>
                <input name="msg" value={inputText} type="text" onChange={(e) => setInputText(e.target.value)} style={{ flex: '1', marginRight: '10px', padding: '5px' }}/>
                <input name="msgText" value={sentText} type="text" style={{ display: "none" }}/>
                <input name="submit" type="submit" onClick={handleMessageSend} style={{ padding: '5px 10px', cursor: 'pointer' }} value="Send" />
              </form>
            </div>
          </div>
        )}
      </div>
      <iframe name="hiddenFrame" width="0" height="0" border="0" style={{ display: "none" }}></iframe>
    </ThemeProvider>
  );
}

export default DoctorChat;
