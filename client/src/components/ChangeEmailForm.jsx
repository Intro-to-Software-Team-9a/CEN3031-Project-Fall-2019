import { connect } from 'react-redux';
import { changeCreateField, doChangeEmail } from '../actions/account';

// this component wraps AbstractForm
import AbstractForm from './AbstractForm.jsx';

// stores name, email, password, and confirm-password
const fields = [
  { type: 'password', name: 'password', label: 'Confirm Password' },
  { type: 'email', name: 'email', label: 'New Email' },
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
    await dispatch(doChangeEmail({ onSuccess: ownProps.onFinish }));
  },
  changeField: (fieldName, newValue) => dispatch(changeCreateField(fieldName, newValue)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AbstractForm);