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
    const postUrl = "http://localhost:5001/api/post/add";
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
    const res = await axios.get("http://localhost:5001/api/post/myposts");

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
    const res = await axios.get("http://localhost:5001/api/post/allPosts");

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
export const addComment=(postId,commentContent)=>async (dispatch)=>{
try{
const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = { description: commentContent};
    const body = JSON.stringify(data);
    const res = await axios.put(`http://localhost:5001/api/post/${postId}/comment`,body,config);
    if(res){
        dispatch({
            type: "ADD_COMMENT",
            payload:{description:commentContent,postId:postId}
        })
      dispatch(setAlert("Comment Successfully adaded.","success"));
    }
}
catch(error){
  console.log(error.message)
  dispatch(setAlert("Error Occured during Comment.Please try again later","danger"));
}
}
export const likePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5001/api/post/${postId}/like`
    );
    dispatch(setAlert("Post Successfully Liked.", "success"));
  } catch (error) {
    dispatch(
      setAlert(
        "Sorry there exists an error within the system during post like. Please try again later",
        "danger"
      )
    );
  }
};
export const deletePost = (postId) => async (dispatch) => {
    try {
        console.log("deletePost Action called");
        console.log(postId);
        const res = await axios.delete(
        `http://localhost:5001/api/post/${postId}`
        );
        if(res.status === 200){
            dispatch({
                type: "REMOVE_POST",
                payload: postId,
            })
            dispatch(setAlert("Post Successfully Deleted.", "success"));
        }
        else{
            dispatch(
            setAlert(
                "Sorry there exists an error within the system during post deletion. Please try again later",
                "danger"
            )
            );
        }
    } catch (error) {
        dispatch(
        setAlert(
            "Sorry there exists an error within the system during post deletion. Please try again later",
            "danger"
        )
        );
    }
}
