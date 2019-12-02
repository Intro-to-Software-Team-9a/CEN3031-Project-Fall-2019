import React from 'react';
import { connect } from 'react-redux';

const checkmark = require('../assets/questionLabelCheckmark.png');

function QuestionList({ questions, sections, questionnaireResponse }) {
  const orderedSections = sections.slice();
  orderedSections.sort((s1, s2) => s1.startIndex - s2.startIndex);

  const sectionElements = orderedSections.map((section, index, sections) => {
    // for each section

    // end index is stored in the next section
    let endIndex = questions.length;
    if (index !== sections.length - 1) {
      endIndex = sections[index + 1].startIndex;
    }

    // iterate through the questions in the current section
    return (
      <div className="p-2" key={section._id}>
        <b>{section.title.toUpperCase()}</b>

        {questions.slice(section.startIndex, endIndex)
          .map((question, count) => {
            // add checkmark to each question title if it is completed
            const currentResponse = questionnaireResponse[question.possibleResponses[0].label];
            const isChecked = (
              currentResponse !== undefined && currentResponse !== ''
            );

            // format checkmark
            return (
              <p className="m-0" key={question._id}>
                Question {count + 1}&nbsp;&nbsp;&nbsp;
                {isChecked
                  ? <img src={checkmark} alt="Checkmark" width="17" height="17"></img>
                  : ''
                }
              </p>
            );
          })}
      </div>
    );
  });

  return (
    <div>
      {sectionElements}
    </div>
  );
}

const mapStateToProps = (state) => ({
  questions: state.questionnaire.questionnaire.questions || [],
  sections: state.questionnaire.questionnaire.sections || [],
  questionnaireResponse: state.questionnaire.questionnaireResponse,
});

const mapDispatchToProps = () => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionList);
