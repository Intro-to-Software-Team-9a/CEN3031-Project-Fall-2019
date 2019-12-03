import { connect } from 'react-redux';
import { changeChangeEmailField } from '../actions/account';

// this component wraps AbstractForm
import AbstractForm from './AbstractForm.jsx';

// fields for the form
const fields = [
  { type: 'password', name: 'password', label: 'Confirm Password' },
  { type: 'email', name: 'email', label: 'New Email' },
];


// create necessary props for AbstractForm
const mapStateToProps = (state) => ({
  data: state.accounts.changeEmailForm,
  state: state.accounts.changeEmailState,
  fields,
  hideSubmitButton: true,
});


// create action-dispatchers for AbstractForm
const mapDispatchToProps = (dispatch) => ({
  changeField: (fieldName, newValue) => dispatch(changeChangeEmailField(fieldName, newValue)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AbstractForm);
