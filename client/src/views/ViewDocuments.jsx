import { connect } from 'react-redux';
import React from 'react';
import './ViewDocuments.css';
import { Row, Col, Container } from 'react-bootstrap';
import Search from '../components/Search';
import CurrentDoc from '../components/CurrentDoc';
import DocumentList from '../components/DocumentList';
import { getDocuments } from '../actions/document';
import { getResponses } from '../actions/viewResponse';
import { Routes } from '../utils/constants';

class ViewDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      selectedDocument: '',
    };
  }

  componentDidMount() {
    this.props.getDocuments();
    this.props.getResponses(); // for 'regenerate!' alert
  }

  setDocument(document) {
    this.setState({
      selectedDocument: document,
    });
  }

  filterText(value) {
    this.setState({
      filterText: value,
    });
  }

  render() {
    return (
      <div className="min-vh-100 bg-light">
        <div className="spacing"></div>
        <Container className="pt-4" fluid>
          <Row className="pt-4">
            <Col sm={1}>
              <h1
                onClick={() => this.props.history.push(Routes.PROFILE_HOME)}
                className="cursor-pointer hover-white float-right">&larr;</h1>
            </Col>
            <Col sm={11} xl={4}>
              <h1>Your Documents</h1>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col className="d-none d-xl-block" xl={1}></Col>
            <Col xl={4}>
              <div className="display-card bg-white shadow">
                <div>
                  <Search filterText={this.filterText.bind(this)} />
                </div>
                <br />
                <div>
                  <DocumentList
                    documentClicked={this.setDocument.bind(this)}
                    filterText={this.state.filterText} />
                </div>
              </div>
            </Col>
            <Col className="d-xl-none" sm={1}></Col>
            {
              this.props.activeTemplate
                ? <Col xl={6}>
                  <div className="d-xl-none spacing-sm"></div>
                  <div className="ml-xl-4 display-card bg-white shadow">
                    <CurrentDoc />
                  </div>
                </Col>
                : ''
            }
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  activeTemplate: state.documents.activeTemplate,
});

const mapDispatchToProps = (dispatch) => ({
  getDocuments: () => dispatch(getDocuments()),
  getResponses: () => dispatch(getResponses()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewDocuments);
