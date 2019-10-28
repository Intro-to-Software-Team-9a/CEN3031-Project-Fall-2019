import React from 'react';
import Counter from '../components/Counter';
import { Link } from 'react-router-dom';
function Test() {
  return (
    <div className="App">
      <Counter />
      <p><Link to="/Home">Go to home</Link></p>
    </div>
  );
}

export default Test;
