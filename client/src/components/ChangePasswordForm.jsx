import { connect } from 'react-redux';
import { changeCreateField, doChangePassword } from '../actions/account';

// this component wraps AbstractForm
import AbstractForm from './AbstractForm.jsx';

// stores name, email, password, and confirm-password
const fields = [
  { type: 'password', name: 'currentpassword', label: 'Current Password' },
  { type: 'password', name: 'password', label: 'New Password' },
  { type: 'password', name: 'confirmpassword', label: 'Confirm New Password' },
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
    await dispatch(doChangePassword({ onSuccess: ownProps.onFinish }));
  },
  changeField: (fieldName, newValue) => dispatch(changeCreateField(fieldName, newValue)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AbstractForm);
