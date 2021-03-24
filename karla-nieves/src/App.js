import React, { useState, useEffect } from "react";
import Form from './Form';
import NewUser from './NewUser';
import schema from './formSchema';
import axios from 'axios';
import * as yup from 'yup';
import './App.css';

const intialFormValues = {
  name: "",
  email: "",
  password: "",

  //checkboxes
  accept: false
}

const initialFormErrors = {
  name: "",
  email: "",
  password: ""
}

const initialUsers = [];
const initialDisabled = true;


export default function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(intialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled)

  const postNewUsers = (newUser) => {
    axios
      .post('https://reqres.in/api/users', newUser)
      .then((res) => {
        setUsers([res.data, ...users]);
        setFormValues(intialFormValues);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })


      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      password: formValues.password.trim(),
      email: formValues.email.trim(),
      terms: ["accept"].filter(
        (term) => formValues[term]
      ),
    };
    postNewUsers(newUser);
  }


  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="container">
      <header>
        <h1>Users App</h1>
      </header>

      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {/* {users.map((user) => {
        return <Friend key={friend.id} details={friend} />;
      })} */}
    </div>
  );

}
