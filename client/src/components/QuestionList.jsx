import React from 'react';
import { connect } from 'react-redux';

function QuestionList({ questions, questionResp }) {
  var count = 1
  return (
    <div>
      {questions.map((question) => (
          <tr>
            <td key={question._id}>Question {count++}&nbsp;&nbsp;&nbsp;</td>
            {(questionResp.questionnaire._id === question._id && 
              typeof(questionResp.questionnaireResponse[question.possibleResponses[0].label]) !==  'undefined' && 
              questionResp.questionnaireResponse[question.possibleResponses[0].label] !== "") ? 
              <img src={require("../assets/questionLabelCheckmark.png")} alt="Checkmark" width="17" height="17"></img> : <td></td>}
          </tr>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  questions: state.questionnaire.questionnaire ? state.questionnaire.questionnaire.questions : [],
  questionResp: state.questionnaire,
});

const mapDispatchToProps = () => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionList);
