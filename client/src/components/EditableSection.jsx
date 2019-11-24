import React from 'react';
import {
  Form, Container, Row, Col, ButtonGroup, Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';

import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Delete from '@material-ui/icons/Delete';

import {
  deleteSection, changeSectionTitle,
} from '../actions/editQuestionnaire';

function EditableSection({
  section,
  changeSectionTitle,
  deleteSection,
}) {
  return (
    <React.Fragment>

      <Container className="pb-2">
        <Row>
          <Col>
            <h5 className="pl-1">Section</h5>
            <Form.Group>
              <Form.Control
                name={`${section._id}-title`}
                type="text"
                value={section.title}
                onChange={(e) => changeSectionTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <ButtonGroup className="float-right">
              <Button variant="outline-dark">
                <Delete onClick={deleteSection} />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <ButtonGroup>
              <Button variant="outline-dark">
                <ArrowUpward />
              </Button>
              <Button variant="outline-dark">
                <ArrowDownward />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeSectionTitle: (newTitle) => dispatch(changeSectionTitle(ownProps.section._id, newTitle)),
  deleteSection: () => dispatch(deleteSection(ownProps.section._id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableSection);
