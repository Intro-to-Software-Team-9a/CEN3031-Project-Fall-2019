import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import printJS from 'print-js';
const FileDownload = require('js-file-download');

function Home() {
  var id = "5dc884c309be682148ecc86c";

  return (
    <Container className="pt-4">
      <meta charset="utf-16"></meta>
      <script src="print.js"></script>
      <p>This is the app home page.</p>
      <p><Link to="/create-account">Create an account</Link></p>
	    <p><button type="button" onClick={() => axios.get('/api/pdf/' + id ).then((response) => {console.log(response); FileDownload(response.data, 'sample.pdf')})}>Download PDF</button></p>
      <p><button type="button" onClick={() => axios.get('/api/pdf/' + id ).then((response) => {})}>Print PDF</button></p>
      <p><button type="button" onClick={() => window.open('http://localhost:5000/api/pdf/'+id, '_blank')}>Open PDF</button></p>
      <a href={axios.get('/api/pdf/' + id).response} download>Download</a>
      <p><Link to="/create-template">Create a Document</Link></p>
    </Container>
  );
}

export default Home;
