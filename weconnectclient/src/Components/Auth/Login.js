import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const axios = require('axios')
const Login = () => {
    const [formData,setFormData] = useState({email:"",password:""});
    const onChangeCapture = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const submitForm = async(e)=>{
        e.preventDefault();
        try {
            const login = {email,password};
            const config = {
                headers: {'Content-Type': 'application/json'}
            }
            const body = JSON.stringify(login);
            const res = await axios.post("/api/auth/login",body,config);
            console.log(res.data.data[0].msg)
        } catch (error) {
            console.log(error.response.data)
        }
    }
    const {email,password} = formData;
  return (
  <section >
  <div className="alert alert-danger">
    Invalid credentials
  </div>
  <h1 className="large text-primary">Sign In</h1>
  <p classNameName="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
  <form className="form" onSubmit={submitForm}>
    <div className="form-group">
      <input
        type="email"
        value={email}
        onChange={onChangeCapture}
        placeholder="Email Address"
        name="email"
        required
      />
    </div>
    <div className="form-group">
      <input
        type="password"
        value={password}
        onChange={onChangeCapture}
        placeholder="Password"
        name="password"
      />
    </div>
    <input type="submit" className="btn btn-primary" value="Login" />
  </form>
  <p className="my-1">
    Don't have an account? <Link to="/register">Register</Link>
  </p>
</section>
  )
}
export default Login;