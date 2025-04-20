import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await signIn(emailAddress, password);
    if (user) {
      navigate('/'); // redirect to home or previous page
    } else {
      setErrors('Invalid credentials');
    }
  };

  return (
    <div className="wrap">
      <div className="form--centered">
        <h2>Sign In</h2>
        {errors && <p className="validation--errors">{errors}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="button" type="submit">Sign In</button>
          <a href="/" className="button button-secondary">Cancel</a>
        </form>
      </div>
    </div>
  );
};

export default SignIn;