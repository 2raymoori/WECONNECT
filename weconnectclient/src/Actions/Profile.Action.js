import axios from "axios";
import { setAlert } from "./Alert";
export const uProfile = () => async (dispatch) => {
  try {
    // const res = await axios.get("http://localhost:5000/api/profile/me");
    // // console.log(res.data.data[0]);
    //   dispatch({
    //     type: "L_PROFILE",
    //     payload: res.data.data[0],
    //   });
  } catch (error) {
    console.log("Error.... in the uprofile Action");
  }
};
// export const clearProfile = () => (dispatch) => {
//   dispatch({
//     type: "CLEAR_PROFILE",
//   });
// };

export const addProfile = (profileObject) => async (dispatch) => {
  try {
    console.log(profileObject);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(profileObject);

    const res = await axios.post(
      "http://localhost:5000/api/profile/add",
      body,
      config
    );
    console.log(res);
    dispatch(setAlert("Profile Successfully Added", "success"));
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

/*
      skills,
      company,
      website,
      bio,
      youtube,
      instagram,
      linkedin,
      facebook,
      working,
*/
