import axios from "axios";
import { setAlert } from "./Alert";
export const uProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5001/api/profile/me");
    // console.log(res.data.data[0]);
    dispatch({
      type: "L_PROFILE",
      payload: res.data.data[0],
    });
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
      "http://localhost:5001/api/profile/add",
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

export const updateProfile = (profileObj, profileId) => async (dispatch) => {
  const updateUrl = `http://localhost:5001/api/profile/update/${profileId}`;
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(profileObj);
    const res = await axios.put(updateUrl, body, config);
    dispatch(setAlert("Profile Successfully updated", "success"));
  } catch (error) {
    dispatch(setAlert("Sorry profile update", "danger"));
  }
};
export const addExperience =
  (experienceData, profileId) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(experienceData);
      const res = await axios.put(
        `http://localhost:5001/api/profile/addexperience/${profileId}`,
        body,
        config
      );
      console.log(res.data);
      dispatch(setAlert("Experience Successfully added", "success"));
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert(
          "Sorry There exists an error while adding an experience",
          "danger"
        )
      );
    }
  };

export const addEducation = (educationData, profileId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(educationData);
    const res = await axios.put(
      `http://localhost:5001/api/profile/addedu/${profileId}`,
      body,
      config
    );
    console.log(res.data);
    dispatch(setAlert("Education Successfully added", "success"));
  } catch (error) {
    console.log(error);
    dispatch(
      setAlert(
        "Sorry There exists an error while adding an Education",
        "danger"
      )
    );
  }
};

export const deleteProfile = (profileId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5001/api/profile/delete/${profileId}`
    );
    dispatch(
      setAlert("Profile Successsfully Deleted from the System.", "success")
    );
  } catch (error) {
    console.log(error);
    dispatch(
      setAlert(
        "Sorry There exists an error while deleting the Profile. Please Try Again later.",
        "danger"
      )
    );
  }
};

export const deleteEducation = (profileId, educationId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5001/api/profile/${profileId}/${educationId}`
    );
    dispatch(
      setAlert("Education Successsfully Deleted from the System.", "success")
    );
  } catch (error) {
    dispatch(
      setAlert(
        "Sorry There exists an error while deleting the Education. Please Try Again later.",
        "danger"
      )
    );
  }
};

export const deleteExperience =
  (profileId, experienceId) => async (dispatch) => {
    try {
      const res = await axios.delete(
        `http://localhost:5001/api/profile/${profileId}/${experienceId}/delete`
      );
      dispatch(
        setAlert("Experience Successsfully Deleted from the System.", "success")
      );
    } catch (error) {
      dispatch(
        setAlert(
          "Sorry There exists an error while deleting the Experience. Please Try Again later.",
          "danger"
        )
      );
    }
  };
export const loadProfiles = () => async (dispatch) => {
  try {
    const URL = "http://localhost:5001/api/profile/allprofile";
    const res = await axios.get(URL);
    const profiles = res.data.data[0].msg;
    dispatch({
      type: "L_PROFILES",
      payload: profiles,
    });
  } catch (error) {}
};

export const loadOtherProfile = (data) => async (dispatch) => {
  dispatch({
    type: "OTHER_PROFILE",
    payload: data,
  });
};
