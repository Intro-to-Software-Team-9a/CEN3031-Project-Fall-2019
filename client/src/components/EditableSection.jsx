import React from 'react';
import {
  Form, Container, Row, Col, ButtonGroup, Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Delete from '@material-ui/icons/Delete';

import {
  deleteSection, changeSectionTitle, moveSection, changeSectionShown,
} from '../actions/editQuestionnaire';

/** Section in the editable questionnaire */
function EditableSection({
  section,
  changeSectionTitle,
  changeSectionShown,
  deleteSection,
  moveSection,
  isFirst,
  isLast,
  isInvalid,
}) {
  return (
    <React.Fragment>
      <Container className="pb-2">
        <Row>
          <Col>
            {isInvalid ? <p>You cannot have an empty section. Please move one of these sections</p> : ''}
            <h5 className="pl-1">Section</h5>
            <Form.Group>
              <Form.Control
                type="text"
                value={section.title}
                onChange={(e) => changeSectionTitle(e.target.value)}
                isValid={!!section.title}
                isInvalid={!section.title}
              />
            </Form.Group>
            <Form.Group className="pl-1">
              <Form.Check
                onChange={() => changeSectionShown(!section.isShownBeforeLogin)}
                label="Show before login"
                checked={section.isShownBeforeLogin}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <ButtonGroup className="float-right">
              <Button variant="outline-dark" onClick={deleteSection}>
                <Delete />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <ButtonGroup>
              <Button
                disabled={isFirst}
                variant="outline-dark"
                onClick={() => moveSection(-1)}
              >
                <ArrowUpward />
              </Button>
              <Button
                disabled={isLast}
                variant="outline-dark"
                onClick={() => moveSection(1)}
              >
                <ArrowDownward />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { questions } = state.editQuestionnaire;
  const { sectionId } = ownProps;
  const section = state.editQuestionnaire.sections.find((section) => section._id === sectionId);
  return {
    isFirst: section.startIndex === 0,
    isLast: section.startIndex >= questions.length,
    section,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  moveSection: (delta) => dispatch(moveSection(ownProps.sectionId, delta)),
  changeSectionTitle: (newTitle) => dispatch(changeSectionTitle(ownProps.sectionId, newTitle)),
  changeSectionShown: (newValue) => dispatch(changeSectionShown(ownProps.sectionId, newValue)),
  deleteSection: () => dispatch(deleteSection(ownProps.sectionId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableSection);
