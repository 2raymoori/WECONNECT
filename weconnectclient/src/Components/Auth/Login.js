import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login } from "../../Actions/Auth";
import Dashboard from "../Dashboard/Dashboard";
const axios = require("axios");

const Login = (props) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const onChangeCapture = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    // console.log(props.userAuth.isAuthenticated);
  }, []);
  const submitForm = async (e) => {
    e.preventDefault();
    props.login(email, password);
    // console.log(props.profile);
    // try {
    //   const login = { email, password };
    //   const config = {
    //     headers: { "Content-Type": "application/json" },
    //   };
    //   const body = JSON.stringify(login);
    //   const res = await axios.post(
    //     "http://localhost:5000/api/auth/login",
    //     body,
    //     config
    //   );
    //   console.log(res.data.data[0].msg);
    // } catch (error) {
    //   console.log(error.response.data);
    // }
  };
  const { email, password } = formData;

  if (props.userAuth.isAuthenticated) {
    // return <h1>Lamin Dashboard</h1>;
    return <Navigate replace to="/dashboard" />;
  }
  return (
    <section>
      <h1 className="large text-primary">Sign In</h1>
      <p classNameName="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
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
  );
};
const mapStateToProps = (state) => ({
  userAuth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { login })(Login);
