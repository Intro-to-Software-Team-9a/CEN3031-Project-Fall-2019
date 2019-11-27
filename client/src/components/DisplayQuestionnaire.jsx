import React from 'react';
import { Form, Button } from 'react-bootstrap';

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
export default function DisplayQuestionnaire({
  sections, questions, onFinish, prompt, isDisabled, response,
}) {
  if (!sections || !questions) return <div></div>;

  // for each section
  // return array of all questions in the section
  const sectionElements = sections.map((section) => (
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
        : <Button variant="dark" onClick={onFinish}>{prompt || 'Continue'}</Button>
      }
    </React.Fragment>
  );
}
