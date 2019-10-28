import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="App">
      <p>This is the app home page.</p>
      <p><Link to="/Test">Go to test page</Link></p>
    </div>
  );
}

export default Home;
