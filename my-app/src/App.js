import React, { useState, useEffect } from 'react';
import axios from 'axios'
import * as yup from 'yup'
import schema from './validation/schema'
import Form from './Form'
import './App.css';

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  accept: false,
}

const initialFormError = {
  name: '',
  email: '',
  password: '',
}


const initialUser = [];
const initialDisabled = true;

export default function App() {
  const [user, setUser] = useState({});
  const [form, setFormValues] = useState(initialFormValues);
  const [formError, setFormError] = useState(initialFormError);
  const [disabled, setDisables] = useState(initialDisabled)


  const getUsers = () => {
    axios
      .get('https://reqres.in/api/users')
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const postNewUser = newUser => {
    axios
      .post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUser([res.data, ...user])
        setFormValues(initialFormValues)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const inputChange = (name, value) => {


    yup
      .reach(schema, name) // get to this part of the schema
      //we can then run validate using the value
      .validate(value) // validate this value
      .then(() => {
        // happy path and clear the error
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      // if the validation is unsuccessful, we can set the error message to the message
      // returned from yup (that we created in our schema)
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          // validation error from schema
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: ['accept'].filter(
        (term) => formValues[term]
      ),
    }
    postNewUser(newUser)
  }

  useEffect(() => {
    getUsers();
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);


  return (
    <div className="App">
      <header>
        <h1> User App</h1>
      </header>

      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
    </div>
  );
}
