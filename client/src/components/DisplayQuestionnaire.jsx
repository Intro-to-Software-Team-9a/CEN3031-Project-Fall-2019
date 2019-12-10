import React from 'react';
import { Form, Button, ButtonToolbar } from 'react-bootstrap';

import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import ShortAnswerQuestion from './ShortAnswerQuestion';

/**
 * Displays a questionnaire.
 * @param sections From Questionnaire object in DB
 * @param questions From Questionnaire object in DB
 * @param onFinish Called on button click
 * @param prompt Prompt for button
 * @param isDisabled Whether editing is allowed
 */
export default class DisplayQuestionnaire extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sectionIndex: 0,
    };

    this.changeSection = this.changeSection.bind(this);
    this.nextSection = async () => {
      if (this.props.submitTempForm) {
        await this.props.submitTempForm();
      }
      this.changeSection(1);
    };
    this.previousSection = () => this.changeSection(-1);
  }

  get numSections() {
    const { sections } = this.props;
    return (sections || []).length;
  }

  /**
   * Adds `delta` to `this.state.sectionIndex`
   * if it would not overflow `this.props.sections.length`
   */
  changeSection(delta) {
    const newSection = this.state.sectionIndex + delta;
    if (newSection >= 0 && newSection < this.numSections) {
      this.setState({ sectionIndex: newSection });
    }
  }

  render() {
    const {
      sections, questions, onFinish, prompt, isDisabled, response,
    } = this.props;

    if (!sections || !questions) return <div></div>;


    // create action buttons
    const isLastSection = this.state.sectionIndex === (this.numSections - 1);
    const isFirstSection = this.state.sectionIndex === 0;

    let continueButton = (
      <Button variant="secondary" onClick={onFinish}>
        {prompt || 'Continue'}
      </Button>
    );

    let previousButton = '';
    if (!isFirstSection) {
      previousButton = (
        <Button className="mr-1" variant="outline-dark" onClick={this.previousSection}>
          Previous Section
        </Button>
      );
    }

    if (!isLastSection) {
      continueButton = (
        <Button variant="secondary" onClick={this.nextSection}>
          Next Section
        </Button>
      );
    }

    // if disabled, show all sections at once.
    // otherwise show current section only
    const selectedSection = sections[this.state.sectionIndex];
    if (!selectedSection) return <div></div>;

    const activeSections = isDisabled ? sections.slice() : [selectedSection];

    // array of all questions in the section
    const sectionElements = activeSections.map((section) => (
      <div className="py-2" key={section._id}>
        <h4>{section.title.toUpperCase()}</h4>
        <hr />
        {questions.slice(section.startIndex, section.endIndex)
          .map((question) => {
            switch (question.questionType) {
              case 'MULTIPLE_CHOICE':
                return <MultipleChoiceQuestion
                  isDisabled={isDisabled}
                  key={question._id}
                  currentResponse={response}
                  question={question} />;
              case 'SHORT_ANSWER':
              case 'LONG_ANSWER':
                return <ShortAnswerQuestion
                  isDisabled={isDisabled}
                  key={question._id}
                  currentResponse={response}
                  question={question} />;
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
        {isDisabled ? ''
          : <ButtonToolbar>
            {previousButton}
            {continueButton}
          </ButtonToolbar>
        }
      </React.Fragment>
    );
  }
}
