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
  const submitForm = async (e) => {
    e.preventDefault();
    props.login(email, password);

  };
  const { email, password } = formData;

  if (props.userAuth.isAuthenticated) {
    // return <h1>Lamin Dashboard</h1>;
    return <Navigate replace to="/dashboard" />;
  }
  return (
    <section className={'container rows d-flex justify-content-between align-items-center'}>
      <div className={'col-lg-65'}>
          <img id={"authImgContainer"} src={"https://www.formsite.com/wp-content/uploads/2022/12/formsite-save-and-return-login.jpg"}  />
      </div>
      <div className="col-lg-65">

        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
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
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  userAuth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { login })(Login);
