const initState = {
  error: {},
  userProfile: null,
  profiles: [],
  other_profile: {},
  loading: true,
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case "L_PROFILE":
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
      };
    case "L_PROFILES":
      return {
        ...state,
        profiles: action.payload,
      };
    case "OTHER_PROFILE":
      return {
        ...state,
        other_profile: action.payload,
      };
    case "CLEAR_PROFILE":
      return {
        ...state,
        error: {},
        userProfile: null,
        profiles: action.payload,
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
