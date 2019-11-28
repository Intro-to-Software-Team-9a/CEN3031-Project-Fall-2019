import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import ShortAnswerQuestion from './ShortAnswerQuestion';

import { submitForm } from '../actions/questionnaire';

/**
 *
 * @param possibleResponses From Questionnaire.question object in DB
 * @param title From Questionnaire.question object in DB
 * @param onClick Callback for onclick
 */
function Questionnaire({ sections, questions, onFinish }) {
  if (!sections || !questions) return <div></div>;

  // return array of all questions in the section
  const sectionElements = sections.map((section) => (
    <div className="py-2" key={section._id}>
      <h4>{section.title.toUpperCase()}</h4>
      <hr />
      {questions.slice(section.startIndex, section.endIndex)
        .map((question) => {
          switch (question.questionType) {
            case 'MULTIPLE_CHOICE':
              return <MultipleChoiceQuestion key={question._id} question={question} />;
            case 'SHORT_ANSWER':
              return <ShortAnswerQuestion key={question._id} question={question} />;
            default:
              return <div></div>;
          }
        })}
    </div>
  ));

  return (
    <React.Fragment>
      <Form>
        {sectionElements}
      </Form>
      <Button variant="outline-dark" onClick={onFinish}>Continue</Button>
    </React.Fragment>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { sections, questions } = state.questionnaire.questionnaire;

  if (!sections || !questions) {
    return ({
      questions: [],
      sections: [],
    });
  }

  const orderedSections = sections.slice();
  orderedSections.sort((s1, s2) => s1.startIndex - s2.startIndex);

  // add endIndex to each section
  const combinedSections = orderedSections.map((section, index) => {
    // get end index from next section
    let endIndex = questions.length;
    if (index !== orderedSections.length - 1) {
      endIndex = orderedSections[index + 1].startIndex;
    }

    return { ...section, endIndex };
  });

  return ({
    questions: (questions || []),
    sections: (combinedSections || []).filter(ownProps.sectionFilter || (() => true)),
  });
};

const mapDispatchToProps = (dispatch) => ({
  submitForm: () => dispatch(submitForm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questionnaire);
