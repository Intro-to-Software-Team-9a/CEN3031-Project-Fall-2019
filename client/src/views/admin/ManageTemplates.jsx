import React from 'react';
import { connect } from 'react-redux';
import { getTemplates } from '../../actions/template';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Template from '../../components/Template';
import UploadTemplateModal from '../UploadTemplate';

class ManageTemplates extends React.Component {
  templates;
  async componentDidMount() {
    await this.props.getTemplates();
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  showModal(show) {
    this.setState({showModal: show});
  }

  render() {
    const documentList = this.props.templates.map((template) => (
        <Template
          template={template}
          onClick={() => this.showModal(true)}
        />
      ));
    return (
      <Container>
        {documentList}
        <button className="btn btn-primary">Add Template</button>
        <UploadTemplateModal show={this.state.showModal} onHide={()=>this.showModal(false)}/>
      </Container>);
  }
}

const mapStateToProps = (state) => ({
  templates: state.templates.templates,
});

const mapDispatchToProps = (dispatch) => ({
  getTemplates: () => dispatch(getTemplates()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageTemplates);