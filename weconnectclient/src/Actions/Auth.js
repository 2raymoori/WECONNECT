import axios from "axios";
import authToken from "../utils/authToken";
import { setAlert } from "./Alert";

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    authToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: "USER_LOADED",
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

export const RegisterUser =
  ({ fName, lName, email, password, passwordConfirm }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({
        fName,
        lName,
        email,
        password,
        passwordConfirm,
      });

      const res = await axios.post(
        "http://localhost:5000/api/user",
        body,
        config
      );
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: { token: res.data.data[0].token },
      });
      dispatch(loadUser());
      if (res.status === 201) {
        console.log("sdfs");
        res.data.data.forEach((err) => {
          dispatch(setAlert(err.msg, "danger"));
        });
      }
      // console.log(res.data)
    } catch (error) {
      console.log(error.message);
      console.log(error);
    }
  };

export const login = (email, password) => async (dispatch) => {
  try {
    console.log("FROM XYZZ");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      email,
      password,
    });
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      body,
      config
    );
    console.log(res.data.data[0].msg);
    if (res.data.status == "Success") {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token: res.data.data[0].msg },
      });
      dispatch(loadUser());
    }
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILED",
    });
  }
};
export const logout = () => (dispatch) => {
  console.log("xyz LOTOUT...");
  dispatch({
    type: "LOGOUT",
  });
};
