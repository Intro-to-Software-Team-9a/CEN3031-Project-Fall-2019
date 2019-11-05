import { connect } from 'react-redux';
import { changeCreateField, doCreateAccount } from '../actions/account';

import SimpleForm from './SimpleForm.jsx';

const fields = [
  { type: 'email', name: 'email', label: 'Email' },
  { type: 'password', name: 'password', label: 'Password' },
  { type: 'password', name: 'confirmpassword', label: 'Confirm Password' },
];


const mapStateToProps = (state) => ({
  data: state.accounts.createForm,
  state: state.accounts.createState,
  fields,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (e) => {
    e.preventDefault();
    dispatch(doCreateAccount());
  },
  changeField: (fieldName, newValue) => dispatch(changeCreateField(fieldName, newValue)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SimpleForm);
