import { connect } from 'react-redux';
import React from 'react';
import './ViewDocuments.css';
import { Row, Col, Container } from 'react-bootstrap';
import Search from '../components/Search';
import CurrentDoc from '../components/CurrentDoc';
import DocumentList from '../components/DocumentList';

import { getDocuments } from '../actions/document';

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
      <Container fluid>
        <Row className="mt-4">

          <Col className="border-right">
            <div className="px-4">

              <h2>&larr; Your Documents</h2>
              <br />
              <div className="ml-4">
                <Search filterText={this.filterText.bind(this)} />
              </div>
              <br />
              <div className="ml-4">
                <DocumentList
                  documentClicked={this.setDocument.bind(this)}
                  filterText={this.state.filterText} />
              </div>
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
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  activeTemplate: state.documents.activeTemplate,
});

const mapDispatchToProps = (dispatch) => ({
  getDocuments: () => dispatch(getDocuments()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewDocuments);
