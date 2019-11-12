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
        <Row>
          <Col md={1}>
            <h2 onClick={() => this.props.history.push('/profile-home')} className="cursor-pointer hover-white float-right">&larr;</h2>
          </Col>
          <Col className="border-right">
            <h2>Your Documents</h2>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewDocuments);
