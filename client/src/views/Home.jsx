import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import printJS from 'print-js';
const FileDownload = require('js-file-download');

function openPDF(pdf){
  window.open(pdf);
  return false;
}

function Home() {
  var id = "5dc884c309be682148ecc86c";

  return (
    <Container className="pt-4">
      <Link to="/questionnaire"><Button variant="outline-dark">Get Started</Button></Link>
      <meta charset="utf-16"></meta>
      <script src="print.js"></script>
      <p>This is the app home page.</p>
      <p><Link to="/create-account">Create an account</Link></p>
	    <p><button type="button" onClick={() => axios.get('/api/pdf/' + id ).then((response) => {console.log(response); FileDownload(response.data, 'sample.pdf')})}>Get PDF</button></p>
      <p><button type="button" onClick={() => axios.get('/api/pdf/' + id ).then((response) => {let blob = new Blob([response.data], {type: 'application/pdf'}); openPDF([response.data])})}>Print PDF</button></p>
      <a href={axios.get('/api/pdf/' + id).response} download>Download</a>
      <p><Link to="/create-template">Create a Document</Link></p>
    </Container>
  );
}

export default Home;
