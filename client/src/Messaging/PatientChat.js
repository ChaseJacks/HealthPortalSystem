//This is a copy of DoctorChat, modified slightly for a patient experience
//Rafael Alfonso

import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../landing-page/getLPTheme';
import CssBaseline from '@mui/material/CssBaseline';
import PatientChatAppBar from '../Menu Bars/PatientBars/PatientChatAppBar';
import { List } from 'survey-react';
import { viewDoctors } from '../api/viewDoctors';  // Import your API function


function PatientChat() {
  const [mode, setMode] = React.useState('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const [patients, setPatients] = React.useState([]);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const [selectedDoctor, setSelectedDoctor] = useState(null); // State to store selected doctor
  const [doctors, setDoctors] = useState([]); // State to store doctors fetched from the database

  const handleDoctorSelect = async (doctor) => {
      setSelectedDoctor(doctor);

      try {
          let myPatID = localStorage.getItem("userTypeID");
          let myDocID = doctor.DoctorID;

          const { msgArr } = await fetch(`/data/msg/${myPatID}/${myDocID}?num=${20}`);

          let newMessages = [];

          for (let i = 0; i < msgArr.length; i++) {
              let sender = msgArr[i].PatientAuthor ? 'You' : doctor.Name;
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

  const fetchDoctorData = async () => {
    try {
        const doctorResponse = await viewDoctors();
        
        if (!doctorResponse) {
            console.log("Error getting doctor list from database");
            return [];
        }

        const doctorList = doctorResponse.recordset;
        return doctorList;

    } catch (err) {
        console.error(err);
        return [];
    }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDoctorData(); // Assuming viewDoctors fetches doctors from the database
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchData();
  }, []);


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

  // Simulate receiving messages from a server
    useEffect(() => {

    const interval = setInterval( async () => {
        if (selectedDoctor) {
            let myPatID = localStorage.getItem("userTypeID");
            let myDocID = selectedDoctor.DoctorID;
            const { msgArr } = await fetch(`/data/msg/${myPatID}/${myDocID}?num=${10}`);

            for (let i = 0; i < msgArr.length; i++) {
                // If it's from the doctor,
                if (!msgArr.PatientAuthor) {
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
                            sender: selectedDoctor.Name
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
      // Open the attachment (e.g., display in a new tab or download)
      window.open(URL.createObjectURL(message.attachment));
    }
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
    //onChange(null); // Notify parent component that the attachment has been removed
  };


  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <div style={{ position: 'relative', zIndex: '1' }}>
      <PatientChatAppBar mode={mode} toggleColorMode={toggleColorMode} />
      </div>
      <div >

      <div style={{ position: 'relative', zIndex: '0', alignItems: 'center' }}>
              <h2>Select Doctor:</h2>
              {/* Display doctors based on selected location */}
              {/* Replace this with your actual doctor selection logic */}
              <ul>
                {doctors.map(doctor => (
                  <li key={doctor.id} onClick={async () => await handleDoctorSelect(doctor)}>
                  <div>
                    
                    <h3>{doctor.Name}</h3>
                    <p>{doctor.Specialization}</p>
                  </div>
                </li>
                ))}
              </ul>
            </div>
      { selectedDoctor && (
   
      <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      
      <h2>Chat with {selectedDoctor.Name} </h2>{/*Is there a way to make this the patient's name? GPT tried to have me make a prop for it outside this file*/}
      <div style={{ height: '300px', overflowY: 'auto', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '5px', textAlign: message.sender === 'user' ? 'right' : 'left' }}>
            <strong>{message.sender === 'user' ? 'You' : selectedDoctor.Name}</strong>: {message.text}
            {message.attachment && (
              <div style={{ marginTop: '5px', cursor: 'pointer', textDecoration: 'underline', color: 'blue' }} onClick={() => handleAttachmentClick(message)}>
                Attachment: {message.attachment.name} ({(message.attachment.size / 1024).toFixed(2)} KB)
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', marginBottom: '10px' }}>
          <form action={`/create/msg/${localStorage.getItem("userTypeID")}/${selectedDoctor.DoctorID}`}
                      method="post"
                      encType="multipart/form-data"
                      target="hiddenFrame">
                      

                      {/*</form>{<input name="attachment" type="file" onChange={handleAttachmentChange} style={{ marginRight: '10px' }} />
                      <button onClick={handleRemoveAttachment}>Remove</button>*/}
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
                      <input name="msgText" value = {sentText} type = "text" style ={ {display: "none" } }/>
                      {/*msg will always send to the request what is in the inputText field; it does not store. So even tho inputText is being reset
                      after it's sent, since it gets reset at the end, the request receives ''
                      However, you want message to be tracking what's being inputted. So it's value must be inputText. But it needs to send what was sent */}
                      <input name="submit" type="submit" onClick={handleMessageSend} style={{ padding: '5px 10px', cursor: 'pointer' }} value="Send" />
           </form>
                  
      </div>
          </div>
      )}



          <iframe name="hiddenFrame" width="0" height="0" border="0" style={{ display: "none" }}></iframe>
</div>
    </ThemeProvider>
  );
}

export default PatientChat;
