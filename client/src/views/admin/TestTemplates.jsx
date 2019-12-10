import React from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Col, Button, Alert, ListGroup,
} from 'react-bootstrap';

import moment from 'moment';
import axios from 'axios';
import { getTemplates } from '../../actions/template';
import Template from '../../components/Template';
import { getQuestionnaire } from '../../actions/questionnaire';
import { getResponses } from '../../actions/viewResponse';
import NoAccess from '../NoAccess';
import { Routes } from '../../utils/constants';

class TestTemplates extends React.Component {
  async componentDidMount() {
    this.props.getTemplates();
    this.props.getResponses();
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedTemplate: null,
      selectedResponse: null,
      isError: false,
      error: '',
    };
  }

  async downloadDocument() {
    try {
      if (!this.state.selectedResponse || !this.state.selectedTemplate) {
        throw new Error('You must select a response and a template.');
      }

      const documentId = this.state.selectedTemplate._id;
      const responseId = this.state.selectedResponse._id;
      const response = await axios.get(`/api/templates/generate-and-download/${documentId}/response/${responseId}`);


      const bufferData = new Uint8Array(response.data.document.data.data);

      // Open a file download prompt
      const blob = new Blob([bufferData], { type: 'application/zip' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = response.data.document.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.setState({ isError: false, error: '' });
    } catch (error) {
      let { message } = error;
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }

      this.setState({ isError: true, error: message });
    }
  }

  onTemplateClick(template) {
    this.setState({ selectedTemplate: template });
  }

  onResponseClick(response) {
    this.setState({ selectedResponse: response });
  }

  goBack() {
    this.props.history.push(Routes.MANAGE_TEMPLATES);
  }

  render() {
    if (!this.props.profile || !this.props.profile.role.isAdmin) {
      return (<NoAccess />);
    }

    const documentList = this.props.templates.map((template) => (
      <Template
        template={template}
        active={template === this.state.selectedTemplate}
        onClick={() => this.onTemplateClick(template)}
      />
    ));
    const makeResponse = (response) => (
      <ListGroup.Item
        onClick={() => this.onResponseClick(response)}
        key={response._id}
        action
        active={response === this.state.selectedResponse}
      >
        {moment(response.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
      </ListGroup.Item>
    );
    return (
      <div className="min-vh-100 bg-light">
        <div className="spacing"></div>
        <Container className="pt-4" fluid>
          <Row className="pt-4">
            <Col sm={1}>
              <h1 onClick={this.goBack.bind(this)} className="cursor-pointer hover-white float-right">&larr;</h1>
            </Col>
            <Col sm={11}>
              <h1>Test A Template</h1>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col className="d-none d-xl-block" xl={1}></Col>
            <Col xl={6} sm={11}>
              <div className="display-card bg-white shadow">
                <h5>Select A Template</h5>
                <div>
                  {documentList}
                </div>
              </div>
            </Col>
          </Row>

          <Row className="pt-4">
            <Col className="d-none d-xl-block" xl={1}></Col>
            <Col xl={6} sm={11}>
              <div className="display-card bg-white shadow">
                <h5>Select A Response</h5>
                <ListGroup>
                  {this.props.responses.map((response) => (
                    makeResponse(response)
                  ))}
                </ListGroup>
              </div>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col className="d-none d-xl-block" xl={1}></Col>
            <Col xl={4} sm={11}>
              {this.state.isError
                ? <Alert variant="danger">
                  {this.state.error}
                </Alert>
                : ''}
            </Col>
          </Row>
          <Row className="pt-4">
            <Col className="d-none d-xl-block" xl={1}></Col>
            <Col sm={11}>
              <Button variant="secondary" onClick={() => this.downloadDocument()}>Test</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  templates: state.templates.templates || [],
  profile: state.profiles.profile,
  responses: state.viewResponse.questionnaireResponses || [],
});

const mapDispatchToProps = (dispatch) => ({
  getTemplates: () => dispatch(getTemplates()),
  getResponses: async () => {
    await dispatch(getQuestionnaire());
    await dispatch(getResponses());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TestTemplates);
