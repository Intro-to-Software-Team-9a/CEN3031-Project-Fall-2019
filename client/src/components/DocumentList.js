import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import { changeActiveTemplate } from '../actions/document';

function DocumentList({
  templates, filterText, changeActiveTemplate,
}) {
  if (templates) {
    const documentList = templates.filter(
      (template) => template.title.toLowerCase().indexOf(filterText.toLowerCase()) >= 0,
    )
      .map((template) => (
        <div key={template._id} style={{ width: '8rem' }}>
          <a href="#" key={template._id} onClick={() => changeActiveTemplate(template)}>
            <Card >
              <Card.Img variant="top"
              src="https://www.pinclipart.com/picdir/middle/23-237671_document-clipart-stack-papers-file-stack-icon-png.png" />
            </Card>
            <center className="pt-2">
              <p>{template.title}</p>
            </center>
          </a>
        </div>
      ));
    return <div>{documentList}</div>;
  }


  return (
      <div><p>No Documents</p></div>
  );
}
const mapStateToProps = (state) => ({
  templates: state.documents.templates,
});

const mapDispatchToProps = (dispatch) => ({
  changeActiveTemplate: (document) => dispatch(changeActiveTemplate(document)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
