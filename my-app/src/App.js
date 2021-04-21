import React, { useState, useEffect } from 'react';
import axios from 'axios'
import * as yup from 'yup'
import schema from './validation/schema'
import Form from './Form'
import './App.css';

const initialFormValue = {
  name: '',
  email: '',
  password: '',
  terms: false,
}

const initialFormErrora = {
  name: '',
  email: '',
  password: '',
}


export default function App() {
  const [user, setUser] = useState({});
  const [form, setFormValues] = useState(initialFormValue);



  return (
    <div className="App">

    </div>
  );
}
