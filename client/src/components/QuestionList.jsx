import React from 'react';
import { connect } from 'react-redux';

const checkmark = require('../assets/questionLabelCheckmark.png');

function QuestionList({ questions, questionResp }) {
  return (
    <div>
      {questions.map((question, count) => {
        // TODO: clean up
        const isChecked = (
          questionResp.questionnaire._id === question._id
          && typeof (questionResp.questionnaireResponse[question.possibleResponses[0].label]) !== 'undefined'
          && questionResp.questionnaireResponse[question.possibleResponses[0].label] !== ''
        );
        return (
          <tr>
            <td key={question._id}>Question {count + 1}&nbsp;&nbsp;&nbsp;</td>
            {isChecked
              ? <img src={checkmark} alt="Checkmark" width="17" height="17"></img>
              : <td></td>
            }
          </tr>
        );
      })}
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
