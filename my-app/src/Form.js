import React from 'react';

export default function Form(props) {
    const { values, submit, change, disabled, errors } = props;

    const onSubmit = (event) => {
        event.preventDefault();
        submit();
    }

    const onChange = (event) => {
        const { name, value, type, checked } = event.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse)
    }

    return (
        <form className="form container" onSubmit={onSubmit}>
            <div className="form-group submit">
                <h2>Add a User</h2>
                <button disabled={disabled}>submit</button>

                <div className='errors'>
                    <div>{errors.name}</div>
                    <div>{errors.password}</div>
                    <div>{errors.email}</div>
                </div>
            </div>

            <div className="form-group inputs">
                <h4>General Information</h4>
                <label>
                    Name
                     <input
                        value={values.name}
                        onChange={onChange}
                        name="name"
                        type="text"
                    />
                </label>
                <label>
                    Password
                     <input
                        value={values.password}
                        onChange={onChange}
                        name="password"
                        type="text"
                    />
                </label>
                <label>
                    Email
                     <input
                        value={values.email}
                        onChange={onChange}
                        name="email"
                        type="text"
                    />
                </label>
            </div>

            <div className="form-group checkboxes">
                <h4> Terms & Conditions</h4>
                <label>
                    Accept
                     <input
                        type="checkbox"
                        name="accept"
                        checked={values.accept}
                        onChange={onChange}
                    />
                </label>


            </div>
        </form>


    );



}