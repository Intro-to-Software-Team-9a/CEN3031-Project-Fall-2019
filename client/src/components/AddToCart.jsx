import React from 'react';
import { connect } from 'react-redux';

import { addTemplate } from '../actions/purchase';
import TemplateList from './TemplateList';

function AddToCart({ filteredTemplates, addTemplate }) {
  return (
    <React.Fragment>
      <TemplateList onClick={addTemplate} templates={filteredTemplates} />
    </React.Fragment>
  );
}

// create necessary props for AbstractForm
const mapStateToProps = (state) => {
  const allTemplates = (state.templates.templates) ? state.templates.templates : [];
  const cartTemplates = state.purchase.cart.templates || [];
  const filteredTemplates = allTemplates.filter((t) => !cartTemplates.includes(t));
  return {
    templates: state.templates.templates,
    filteredTemplates,
  };
};

// create action-dispatchers for AbstractForm
const mapDispatchToProps = (dispatch) => ({
  addTemplate: (template) => dispatch(addTemplate(template)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddToCart);
