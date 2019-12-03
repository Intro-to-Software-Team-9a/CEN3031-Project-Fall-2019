import React from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, Button, Container,
} from 'react-bootstrap';
import { getTemplates } from '../../actions/template';
import Template from '../../components/Template';
import UploadTemplateModal from '../UploadTemplate';
import NoAccess from '../NoAccess';
import { Routes } from '../../utils/constants';

class ManageTemplates extends React.Component {
  templates;

  async componentDidMount() {
    await this.props.getTemplates();
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedTemplate: null,
    };
  }

  showModal(show) {
    this.setState({ showModal: show });
  }

  onTemplateUpload() {
    this.props.getTemplates();
  }

  onTemplateClick(template) {
    this.setState({ selectedTemplate: template });
    this.showModal(true);
  }

  goBack() {
    this.props.history.push(Routes.PROFILE_HOME);
  }

  render() {
    if (!this.props.profile || !this.props.profile.role.isAdmin) {
      return (<NoAccess />);
    }

    const documentList = this.props.templates.map((template) => (
      <Template
        template={template}
        onClick={() => this.onTemplateClick(template)}
      />
    ));
    return (
      <div className="min-vh-100 bg-light">
        <div className="spacing"></div>
        <Container className="pt-4" fluid>
          <Row className="pt-4">
            <Col sm={1}>
              <h1 onClick={this.goBack.bind(this)} className="cursor-pointer hover-white float-right">&larr;</h1>
            </Col>
            <Col sm={11}>
              <h1>Manage Templates</h1>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col className="d-none d-xl-block" xl={1}></Col>
            <Col sm={11}>
              <div>
                {documentList}
              </div>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col className="d-none d-xl-block" xl={1}></Col>
            <Col sm={11}>
              <Button variant="secondary" onClick={() => this.onTemplateClick(null)}>Add Template</Button>
              <UploadTemplateModal
                show={this.state.showModal}
                onHide={() => this.showModal(false)}
                template={this.state.selectedTemplate}
                onTemplateUpload={this.onTemplateUpload.bind(this)} />
            </Col>
          </Row>
        </Container>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  templates: state.templates.templates,
  profile: state.profiles.profile,
});

const mapDispatchToProps = (dispatch) => ({
  getTemplates: () => dispatch(getTemplates()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageTemplates);
