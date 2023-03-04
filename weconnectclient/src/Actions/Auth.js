import axios from "axios";
import authToken from "../utils/authToken";
import { setAlert } from "./Alert";
import { loadCurPosts, loadOtherPosts } from "./Post";
import { loadProfiles } from "./Profile.Action";
//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    authToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    // console.log(res.data.data[0].msg);
    dispatch({
      type: "USER_LOADED",
      payload: res.data.data[0].msg,
    });

    const response = await axios.get("/api/profile/me");
    console.log(response.data.data[0]);
    dispatch({
      type: "L_PROFILE",
      payload: response.data.data[0],
    });
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

export const RegisterUser =
  ({ fName, lName, email, password, passwordConfirm, profileImage }) =>
  async (dispatch) => {
    try {
      const fomData = new FormData();
      fomData.append("fName", fName);
      fomData.append("lName", lName);
      fomData.append("email", email);
      fomData.append("password", password);
      fomData.append("passwordConfirm", passwordConfirm);
      fomData.append("pImage", profileImage);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const body = JSON.stringify({
        fName,
        lName,
        email,
        password,
        passwordConfirm,
      });

      // const res = await axios.post(
      //   "http://localhost:5000/api/user",
      //   body,
      //   formData,
      //   config
      // );

      const res = await axios.post("http://localhost:5000/api/user", fomData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: { token: res.data.data[0].token },
      });
      dispatch(loadUser());
      if (res.status === 201) {
        // console.log("sdfs");
        res.data.data.forEach((err) => {
          dispatch(setAlert(err.msg, "danger"));
        });
      }
      // console.log(res.data)
    } catch (error) {
      // console.log(error.message);
      // console.log(error);
    }
  };

export const login = (email, password) => async (dispatch) => {
  try {
    // console.log("FROM XYZZ");
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
    if (res.data.status == "Success") {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token: res.data.data[0].msg },
      });
      dispatch(loadUser());
      dispatch(loadProfiles());
      dispatch(loadCurPosts());
      dispatch(loadOtherPosts());
    }
  } catch (error) {
    dispatch(
      setAlert(
        "Sorry There exists an error in your credentials. Please try again.",
        "danger"
      )
    );
    dispatch({
      type: "LOGIN_FAILED",
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: "CLEAR_PROFILE" });
  dispatch({
    type: "LOGOUT",
  });
};
