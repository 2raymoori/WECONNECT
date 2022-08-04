const initState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};
export default function (state = initState, action) {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      // console.log(action.payload.token);
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "REGISTER_FAIL":
    case "AUTH_ERROR":
    case "LOGIN_FAILED":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
