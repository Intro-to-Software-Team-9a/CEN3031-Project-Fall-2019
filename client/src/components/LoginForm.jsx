import { connect } from 'react-redux';
import { doLogin, changeLoginField } from '../actions/account';

// this component wraps AbstractForm
import AbstractForm from './AbstractForm.jsx';

 // define fields for AbstractForm
const fields = [
  { type: 'email', name: 'email', label: 'Email' },
  { type: 'password', name: 'password', label: 'Password' },
];


// create necessary props for AbstractForm
const mapStateToProps = (state) => ({
  data: state.accounts.loginForm,
  state: state.accounts.loginState,
  fields,
});

// create action-dispatchers for AbstractForm
const mapDispatchToProps = (dispatch) => ({
  onSubmit: (e) => {
    e.preventDefault();
    dispatch(doLogin());
  },
  changeField: (fieldName, newValue) => dispatch(changeLoginField(fieldName, newValue)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AbstractForm);
