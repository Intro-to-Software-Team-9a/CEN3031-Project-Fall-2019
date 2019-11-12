import React from 'react';
import { connect } from 'react-redux';

import { removeTemplate } from '../actions/purchase';
import TemplateList from './TemplateList';

function Cart({ templates, removeTemplate }) {
  return (
    <React.Fragment>
      <TemplateList onClick={removeTemplate} templates={templates} />
    </React.Fragment>
  )
}

// create necessary props for AbstractForm
const mapStateToProps = (state) => ({
  templates: state.purchase.cart.templates,
});


// create action-dispatchers for AbstractForm
const mapDispatchToProps = (dispatch) => ({
  removeTemplate: (template) => dispatch(removeTemplate(template)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
