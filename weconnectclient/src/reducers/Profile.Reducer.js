const initState = {
  error: {},
  userProfile: null,
  profiles: [],
  loading: true,
  x: "xyz",
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case "L_PROFILE":
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
        x: "abc",
      };
    case "CLEAR_PROFILE":
      return {
        ...state,
        error: {},
        userProfile: null,
        profiles: [],
        loading: false,
      };
    default:
      return state;
  }
};
export default profileReducer;

/*
Object { status: "Developer", company: "sdfs", location: "", website: "sdrwer",
skills: "sdf,gswe", bio: "", linkedin: "", youtube: "", facebook: "", twitter: ""
*/
