import { combineReducers } from "redux";
import alert from "./Alert";
import auth from "./auth";
import p from "./Profile.Reducer";
export default combineReducers({ alert, auth, p });
