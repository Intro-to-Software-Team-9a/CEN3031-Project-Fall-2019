import React from 'react';
import { connect } from 'react-redux';
import { getTemplates } from '../../actions/template';
import { Button, Container, Card, CardDeck } from 'react-bootstrap';
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
      showModal: false,
      selectedTemplate: null
    }
  }

  showModal(show) {
    this.setState({showModal: show});
  }

  onTemplateUpload() {
    this.props.getTemplates();
  }

  onTemplateClick(template) {
    this.setState({selectedTemplate: template});
    this.showModal(true);
  }

  render() {
    const documentList = this.props.templates.map((template) => (
        <Template
          template={template}
          onClick={() => this.onTemplateClick(template)}
        />
      ));
    return (
      <Container>
        <div>
          {documentList}
        </div>
        <Button onClick={()=>this.onTemplateClick(null)}>Add Template</Button>
        <UploadTemplateModal
          show={this.state.showModal}
          onHide={()=>this.showModal(false)}
          template={this.state.selectedTemplate}
          onTemplateUpload={this.onTemplateUpload.bind(this)}/>
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