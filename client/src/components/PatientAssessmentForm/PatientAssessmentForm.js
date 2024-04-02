import React from 'react';
import ReactDOM from 'react-dom';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import json from './PatientAssessmentForm.json';
import PAFormBar from './PAFormBar';
import ToggleColorMode from '../../landing-page/components/ToggleColorMode';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../../landing-page/getLPTheme';
import CssBaseline from '@mui/material/CssBaseline';

import { createAssessmentForm } from '../../api/createAssessmentForm';

function SurveyComponent() {
  const [mode, setMode] = React.useState('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };
  const survey = new Survey.Model(json);

  survey.onComplete.add(async (sender, options) => {
    console.log(JSON.stringify(sender.data, null, 3));
    
      // @author Richard Williams
      const patientID = localStorage.getItem("userTypeID");
      const patientName = localStorage.getItem("name");
      const patientResponse = JSON.stringify(sender.data);

      try {
          const result = await createAssessmentForm(patientID, patientName, patientResponse);
          console.log(result.msg);
      } catch (err) {
          console.log("Error submitting form! " + err.message);
      }
      // ------------------------
  });

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
    <CssBaseline />
    {/* It's important to have the positions be relative; they might not all need to be relative, but that's how it's working*/ }
    <div style={{ position: 'relative', zIndex: '1' }}> {/* Ensure AppBar is in its own stacking context (via the zIndex) */}
      <PAFormBar mode={mode} toggleColorMode={toggleColorMode} />
      <div style={{ position: 'relative', zIndex: '0', width: '80vw', height: '100vh', 
                        display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '80vw', height: '100vh' }}>{/*It's important that this div is equal to the div above*/}
     {/* Your expanding component goes here*/}
      <Survey.Survey model={survey} />
      </div>
      </div>
    </div>
    </ThemeProvider>
  );
}

// Ensure the target container exists before rendering
const targetContainer = document.getElementById("surveyElement");
if (targetContainer) {
  try {
    ReactDOM.render(<SurveyComponent />, targetContainer);
  } catch (error) {
    console.error("Error rendering survey:", error);
  }
} else {
  console.error("Target container '#surveyElement' not found in the DOM.");
}

export default SurveyComponent;
