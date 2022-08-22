import axios from "axios";
import { setAlert } from "./Alert";
export const createPost = (inputTitle, inputDesc) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = { title: inputTitle, description: inputDesc };
    const body = JSON.stringify(data);
    const postUrl = "http://localhost:5000/api/post/add";
    const res = await axios.post(postUrl, body, config);
    dispatch({
      type: "ADD_POST",
      payload: res.data.data[0].data,
    });
  } catch (error) {
    dispatch(
      setAlert("Error Occured in the Post creation. Please try again later")
    );
  }
};

export const loadCurPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/post/myposts");

    dispatch({
      type: "LOAD_CUR_USER_POSTS",
      payload: res.data.data[0].data,
    });
  } catch (error) {
    dispatch(
      setAlert("Error Occured in the Post creation. Please try again later")
    );
  }
};

export const loadOtherPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/post/allPosts");

    dispatch({
      type: "LOAD_OTHER_POSTS",
      payload: res.data.data[0].msg,
    });
  } catch (error) {
    dispatch(
      setAlert("Error Occured in the Post creation. Please try again later")
    );
  }
};