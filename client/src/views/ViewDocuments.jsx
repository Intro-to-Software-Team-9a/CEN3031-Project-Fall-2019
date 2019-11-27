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
    this.props.getResponses();
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
      <Container className="pt-4" fluid>
        <Row className="pt-4">
          <Col md={1}>
            <h1
              onClick={() => this.props.history.push(Routes.PROFILE_HOME)}
              className="cursor-pointer hover-white float-right">&larr;</h1>
          </Col>
          <Col className="border-right">
            <h1>Your Documents</h1>
            <br />
            <div>
              <Search filterText={this.filterText.bind(this)} />
            </div>
            <br />
            <div>
              <DocumentList
                documentClicked={this.setDocument.bind(this)}
                filterText={this.state.filterText} />
            </div>
          </Col>
        {
          this.props.activeTemplate
            ? <Col md={7}>
              <div className="px-4">
                <CurrentDoc />
              </div>
            </Col>
            : ''
        }
        </Row>
      </Container >
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
