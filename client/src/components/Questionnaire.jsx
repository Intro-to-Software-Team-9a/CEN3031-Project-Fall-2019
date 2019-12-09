import { connect } from 'react-redux';
import { submitForm, submitTempForm } from '../actions/questionnaire';
import DisplayQuestionnaire from './DisplayQuestionnaire';


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
    response: state.questionnaire.questionnaireResponse,
  });
};

const mapDispatchToProps = (dispatch) => ({
  submitForm: () => dispatch(submitForm()),
  submitTempForm: () => dispatch(submitTempForm()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DisplayQuestionnaire);
