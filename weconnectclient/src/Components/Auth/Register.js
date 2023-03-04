import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { setAlert } from "../../Actions/Alert";
import { RegisterUser } from "../../Actions/Auth";
import axios from "axios";
const Register = (props) => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    pImage: "",
  });
  const { fName, lName, email, password, passwordConfirm } = formData;

  const onChangeText = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      props.setAlert("Password not match", "danger");
    } else {
      // const fomData = new FormData();
      // fomData.append("fName", fName);
      // fomData.append("lName", lName);
      // fomData.append("email", email);
      // fomData.append("password", password);
      // fomData.append("passwordConfirm", passwordConfirm);
      // fomData.append("pImage", formData.pImage);
      // console.log(formData);

      // try {
      //   const res = await axios.post(
      //     `http://localhost:5000/api/user`,
      //     fomData,
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
      // } catch (error) {
      //   console.log(error);
      //   // alert("Sorry Document failed to upload. Please try again");
      // }

      props.RegisterUser({
        fName,
        lName,
        email,
        password,
        passwordConfirm,
        profileImage: formData.pImage,
      });
      /*
      // try {
      //     const config = {
      //         headers: {
      //             "Content-Type":"application/json"
      //         }
      //     }
      //     const newUer = {fName,lName,email,password,passwordConfirm}
      //     const body = JSON.stringify(newUer);
      //     const res = await axios.post("/api/user",body,config)
      //     console.log(res.data)

      // } catch (error) {
      //     console.log(error.response.data)
      // }
      */
    }
  };
  const captureProfileFile = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };
  if (props.userAuth.isAuthenticated) {
    return <Navigate replace to="/dashboard" />;
  }
  return (
    <section>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form
        className="form"
        enctype="multipart/form-data"
        onSubmit={submitForm}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name"
            value={fName}
            onChangeCapture={onChangeText}
            name="fName"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Last Name"
            value={lName}
            onChangeCapture={onChangeText}
            name="lName"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            onChangeCapture={onChangeText}
            value={email}
            name="email"
          />
        </div>

        <div className="form-group">
          <label for="pImage">Profile Image</label>
          <input
            id="pImage"
            type="file"
            name="pImage"
            onChange={captureProfileFile}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <input
            onChangeCapture={onChangeText}
            value={password}
            type="password"
            placeholder="Password"
            name="password"
          />
        </div>
        <div className="form-group">
          <input
            onChangeCapture={onChangeText}
            value={passwordConfirm}
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
};
const xyzToState = (state) => ({
  userAuth: state.auth,
});
export default connect(xyzToState, { setAlert, RegisterUser })(Register);
