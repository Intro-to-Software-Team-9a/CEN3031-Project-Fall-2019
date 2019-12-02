import React from 'react';
import { connect } from 'react-redux';
import { changeActiveTemplate } from '../actions/document';
import Template from './Template';

function DocumentList({
  templates, filterText, changeActiveTemplate,
}) {
  if (templates) {
    const documentList = templates.filter(
      (template) => template.title.toLowerCase().indexOf(filterText.toLowerCase()) >= 0,
    )
      .map((template) => (
        <Template
          onClick={() => changeActiveTemplate(template)}
          template={template}
        />
      ));
    return <div>{documentList}</div>;
  }


  return (
    <div><p>No Documents</p></div>
  );
}
const mapStateToProps = (state) => {
  const allTemplates = state.templates.templates;
  const { profile } = state.profiles;
  if (!profile) {
    return {
      templates: [],
    };
  }

  const ownedTemplateTypes = allTemplates.filter((t) => profile.ownedTemplateTypes.includes(t._id));
  return {
    templates: ownedTemplateTypes,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeActiveTemplate: (document) => dispatch(changeActiveTemplate(document)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);
