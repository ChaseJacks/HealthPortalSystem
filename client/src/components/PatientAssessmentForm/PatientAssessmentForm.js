import React from 'react';
import ReactDOM from 'react-dom';
import * as Survey from 'survey-react';
import 'survey-react/survey.css';
import json from './PatientAssessmentForm.json';

function SurveyComponent() {
  const survey = new Survey.Model(json);

  survey.onComplete.add((sender, options) => {
    console.log(JSON.stringify(sender.data, null, 3));
  });

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '80%' }}>
        <Survey.Survey model={survey} />
      </div>
    </div>
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
