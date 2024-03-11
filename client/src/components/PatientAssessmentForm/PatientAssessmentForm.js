import React from 'react';
import ReactDOM from 'react-dom';
import * as SurveyReact from 'survey-react'; // Import SurveyReact
import * as Survey from 'survey-react'; // Import SurveyReact
import 'survey-react/survey.css';

// Import the JSON for the form
const json = require('./PatientAssessmentForm.json');

function SurveyComponent() {
const survey = new Survey.Model(json);
survey.onComplete.add((sender, options) => {
    console.log(JSON.stringify(sender.data, null, 3));
});
  
return <Survey.Survey model={survey} />;
}
  
// Ensure the target container exists before rendering
const targetContainer = document.getElementById("surveyElement");
if (targetContainer) {
const root = ReactDOM.createRoot(targetContainer);
root.render(<SurveyComponent />);
} else {
console.error("Target container '#surveyElement' not found in the DOM.");
}
  
export default SurveyComponent;