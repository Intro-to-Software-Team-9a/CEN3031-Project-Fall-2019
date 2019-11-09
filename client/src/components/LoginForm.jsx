import { connect } from 'react-redux';
import { doLogin, changeLoginField } from '../actions/account';
import { getDocuments } from '../actions/document';

import SimpleForm from './SimpleForm.jsx';

const fields = [
  { type: 'email', name: 'email', label: 'Email' },
  { type: 'password', name: 'password', label: 'Password' },
];


const mapStateToProps = (state) => ({
  data: state.accounts.loginForm,
  state: state.accounts.loginState,
  fields,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: async (e) => {
    e.preventDefault();
    await dispatch(doLogin());
    await dispatch(getDocuments());
  },
  changeField: (fieldName, newValue) => dispatch(changeLoginField(fieldName, newValue)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SimpleForm);
