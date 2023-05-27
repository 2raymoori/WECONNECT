const initState = {
  error: {},
  userProfile: null,
  profiles: [],
  other_profile: {},
  loading: true,
};
//lo2raymoori@gmail.com
//811532_lot
const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case "L_PROFILE":
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
      };
    case "ADD_EDUCATION":
      console.log(action.payload);
      const oldState = state.userProfile;
      oldState.msg.education.push(action.payload);
      console.log(oldState);
      return{
        ...state,
        userProfile: oldState,
      };
    case "ADD_EXPERIENCE":
      console.log(action.payload);
      const oldState2 = state.userProfile;
      oldState2.msg.experience.push(action.payload);
      return{
        ...state,
        userProfile: oldState2,
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
