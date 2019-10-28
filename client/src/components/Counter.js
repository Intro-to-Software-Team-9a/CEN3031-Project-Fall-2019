import React from 'react';
import { connect } from 'react-redux';
import { incrementCount } from '../actions/count';

function Counter ({  count, incrementCount }) {
  return (
    <div>
      <p>Current Count is: {count} (<button onClick={incrementCount}>Increment</button>)</p>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  count: state.count.count,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  incrementCount: () => dispatch(incrementCount()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);
