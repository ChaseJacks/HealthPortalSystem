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

  survey.onComplete.add((sender, options) => {
    console.log(JSON.stringify(sender.data, null, 3));
    //RICHARD HELP PLS
  });

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
    <CssBaseline />
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '80%' }}>
        <PAFormBar mode={mode} toggleColorMode={toggleColorMode} />
        <Survey.Survey model={survey} />
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
