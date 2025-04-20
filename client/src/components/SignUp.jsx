import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ValidationErrors from './ValidationErrors';

const SignUp = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: ''
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.status === 201) {
        await signIn(formData.emailAddress, formData.password);
        navigate('/');
      } else if (res.status === 400) {
        const data = await res.json();
        setErrors(data.errors || ['Could not create user.']);
      } else {
        throw new Error('Unexpected error during sign up');
      }
    } catch (err) {
      console.error(err);
      setErrors(['An unexpected error occurred.']);
    }
  };

  return (
    <div className="wrap">
      <div className="form--centered">
        <h2>Sign Up</h2>

        <ValidationErrors errors={errors} /> {/* shared component */}

        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
          />

          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={formData.emailAddress}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="button" type="submit">Sign Up</button>
          <a href="/" className="button button-secondary">Cancel</a>
        </form>
      </div>
    </div>
  );
};

export default SignUp;