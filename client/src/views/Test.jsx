import React from 'react';
import { Link } from 'react-router-dom';
import Counter from '../components/Counter.jsx';

function Test() {
  return (
    <div className="App">
      <Counter />
      <p><Link to="/Home">Go to home</Link></p>
    </div>
  );
}

export default Test;
