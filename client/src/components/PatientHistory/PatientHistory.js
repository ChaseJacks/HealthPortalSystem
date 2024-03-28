//WE DON'T USE THIS

import React from 'react';
import ReactDOM from 'react-dom';
import * as SurveyReact from 'survey-react'; // Import SurveyReact
import * as Survey from 'survey-react'; // Import SurveyReact
import 'survey-react/survey.css';

// Import the JSON
const json = require('./PatientHistory.json');

function SurveyComponent() {
    const survey = new Survey.Model(json);
    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });
    var storageName = "survey_patient_history";
    function saveSurveyData(survey) {
        var data = survey.data;
        data.pageNo = survey.currentPageNo;
        window.localStorage.setItem(storageName, JSON.stringify(data));
    }
    survey.onPartialSend.add(function(sender){
        saveSurveyData(sender);
    });
    survey.onComplete.add(function(sender, options){
        saveSurveyData(sender);
    });
      
    survey.sendResultOnPageNext = true;
    var prevData = window.localStorage.getItem(storageName) || null;
    if(prevData) {
        var data = JSON.parse(prevData);
        survey.data = data;
        if(data.pageNo) {
            survey.currentPageNo = data.pageNo;
        }
    }
    return (<SurveyReact.Survey model={survey} />);
}
  
const targetContainer = document.getElementById("surveyElement");
if (targetContainer) {
const root = ReactDOM.createRoot(targetContainer);
root.render(<SurveyComponent />);
} else {
console.error("Target container '#surveyElement' not found in the DOM.");
}
export default SurveyComponent