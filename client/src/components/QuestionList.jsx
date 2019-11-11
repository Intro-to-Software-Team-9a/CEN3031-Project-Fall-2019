import React from 'react';
import { connect } from 'react-redux';

function QuestionList({ questions }) {
  return (
    <div>
      {questions.map((question) => (
        <p key={question._id}>{question.title}</p>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  questions: state.questionnaire.questionnaire ? state.questionnaire.questionnaire.questions : [],
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionList);
