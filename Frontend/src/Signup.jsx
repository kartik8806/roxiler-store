

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignupValidation from './SignupValidation.js';
import axios from 'axios'
const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const validationErrors = SignupValidation(values);
    setErrors(validationErrors);
  
    // Check if there are no errors before submitting
    const noErrors = Object.values(validationErrors).every((error) => error === "");
  
    if (!noErrors) return;
  
    try {
      const response = await axios.post('http://localhost:8081/Signup', values);
      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      // Optionally show user feedback here
    }

  
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-50'>
        <h2 className='text-center text-2xl font-bold'>Sign-up</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div className='mb-3'>
            <label htmlFor='name'>
              <strong>Name</strong>
            </label>
            <input
              type='text'
              name='name'
              placeholder='Enter your Name'
              className='form-control rounded-0'
              onChange={handleInput}
            />
            {errors.name && <span className='text-danger'>{errors.name}</span>}
          </div>

          <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Email</strong>
            </label>
            <input
              type='email'
              name='email'
              placeholder='Enter your email'
              className='form-control rounded-0'
              onChange={handleInput}
            />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>

          <div className='mb-3'>
            <label htmlFor='password'>
              <strong>Password</strong>
            </label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password'
              className='form-control rounded-0'
              onChange={handleInput}
            />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>

          <div className='mb-3'>
            <label htmlFor='address'>
              <strong>Address</strong>
            </label>
            <input
              type='text'
              name='address'
              placeholder='Enter your address'
              className='form-control rounded-0'
              onChange={handleInput}
            />
            {errors.address && <span className='text-danger'>{errors.address}</span>}
          </div>

          <button type='submit' className='btn btn-success w-100 rounded-0'>
            Sign Up
          </button>
          <p>You agree to our terms and conditions.</p>
          <Link
            to='/'
            className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
