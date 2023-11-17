import React, { useState } from 'react';
import "./login.css";
import hi from "../signup/hi.svg";
import eye from "../signup/eyeopen.svg";
import eyeclose from "../signup/eyeclose.svg";
import warn from '../warn';

export default function Signup() {
  const initialFormData = {
    email: '',
    password: '',   
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('logged in successfully!');
        // Optionally, you can redirect the user to another page or show a success message.
      } 
      else {
        const errorResponse = await response.json(); 
        console.log(errorResponse.error)// Parse the error response as JSON
        warn(`${errorResponse.error}`);
        setFormData(initialFormData)
 }
    } catch (error) {
      console.error('Error occurred during form submission:', error);
      // Handle error, show an error message, etc.
    }
  };
  

  return (
    <div className='forml'>
      <p className='headingl'>
        <span className='hiil'>
          <img src={hi} alt="Hi" />
        </span>
        <span className='textl'>WELCOME TO</span>
        <span className='fitl'>tablefit</span>
      </p>
      <br />

      <form onSubmit={handleSubmit} className='form-contentl'>

        <div>
          <label htmlFor="email">Email</label><br />
          <input
            className='inputl'
            type="email"
            id="email"
            name="email"
            placeholder='type your email'
            value={formData.email}
            onChange={handleInputChange}
            // onBlur={validateEmail}
          />
          {emailError && <p className="error-messagel">{emailError}</p>}
        </div>
        <br />

        <div className='passl'>
          <div>
            <label htmlFor="password">Password</label><br />
            <input
              className='inputl'
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder='type your password'
              value={formData.password}
              onChange={handleInputChange}
              // onBlur={validatePassword}
            />
          </div>
          <img src={showPassword ? eye : eyeclose} alt="eye" onClick={togglePassword} className='togglel' />
          {passwordError && <p className="error-messagel">{passwordError}</p>}
        </div>
        <br />
        <p className='alreadyl'>Don't have an account? <span className='logl'><u>signup</u></span><span>Forgot password?</span></p>
        <button type="submit" className='signupButtonl'>Login</button>
      </form>
    </div>
  );
}
