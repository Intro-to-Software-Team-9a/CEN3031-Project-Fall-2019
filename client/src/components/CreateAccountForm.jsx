import { connect } from 'react-redux';
import { changeCreateField, doCreateAccount } from '../actions/account';

// this component wraps AbstractForm
import AbstractForm from './AbstractForm.jsx';
// I am a really long line and i am very verbose and will cause the linter to get mad at me which is what the intention is in this case because I'm trying to test that it will actually cause the build to fail (which it should).
// stores name, email, password, and confirm-password
const fields = [
  { type: 'text', name: 'name', label: 'Your Name' },
  { type: 'email', name: 'email', label: 'Email' },
  { type: 'password', name: 'password', label: 'Password' },
  { type: 'password', name: 'confirmpassword', label: 'Confirm Password' },
];


// create necessary props for AbstractForm
const mapStateToProps = (state) => ({
  data: state.accounts.createForm,
  state: state.accounts.createState,
  fields,
});


// create action-dispatchers for AbstractForm
const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: async (e) => {
    e.preventDefault();
    await dispatch(doCreateAccount({ onSuccess: ownProps.onFinish }));
  },
  changeField: (fieldName, newValue) => dispatch(changeCreateField(fieldName, newValue)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AbstractForm);
