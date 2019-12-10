import React from 'react';
import { connect } from 'react-redux';

class Terms_Conditions extends React.Component {
  
    render() {
      return (
        <div className="min-vh-100 bg-light">
          <div className="spacing"></div>
          <p>Hello</p>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
    profile: state.profiles.profile,
  });

  export default connect(
    mapStateToProps,
  )(Terms_Conditions);