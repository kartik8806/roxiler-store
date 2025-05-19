import axios from 'axios';
import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"

// import Validation from './LoginValidation';

const Login = () => {
    const [values, setValues] = useState({
        email:"",
        password:''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
   
    const handleInput = (event) => {
        setValues(prev => ({
          ...prev,
          [event.target.name]: event.target.value
        }));
      };

    const handleSubmit = async (event)=>{
        event.preventDefault();
      //   setErrors(Validation(values));
      //   console.log(values);
       try {
         
        const response = await axios.post('http://localhost:8081/login', values);
      if (response) {
        navigate('/home');
        console.log(response.data);

        localStorage.setItem("token",response.data.token)
        
      }else {
        alert("no records existed");
        
      }
       } catch (error) {
        console.log(error);
        
       }
    };
    
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
    <div className='bg-white p-3 rounded w-35'>
       <h2 className="text-center text-2xl font-bold">Sign-in</h2>
        <form action="" onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="email"><strong> Email </strong></label>
                <input type="email"  placeholder="Enter email" name='email'
                onChange={handleInput} 
                className='form-control rounded-0'></input>
                {errors.email && <span className='text-danger'> {errors.email}</span>}

            </div>

        <div className='mb-3'>
            <label htmFor="password"><strong> Password </strong> </label>
            <input type="password"  placeholder="Enter your Password"  name='password'
            onChange={handleInput} 
            className='form-control rounded-0'></input>
            {errors.password && <span className='text-danger'> {errors.password}</span>}
        </div>
        <button  type="submit"className='btn btn-success w-100 rounded-0'>
            Log In 
        </button>
        <p> You are agree terms and condition</p>
        <Link to='/Signup' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
            Create  Account
        </Link>
        </form>
    </div>     

    </div>
  )
};

export default Login