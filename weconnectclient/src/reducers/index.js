import { combineReducers } from "redux";
import alert from "./Alert";
import auth from "./auth";
import p from "./Profile.Reducer";
import postReducer from "./Post.Reducer";
export default combineReducers({ alert, auth, p, postReducer });
