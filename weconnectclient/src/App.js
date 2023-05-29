import {Fragment, useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import "./App.css";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Dashboard from "./Components/Dashboard/Dashboard";
import Landing from "./Components/Layouts/Landing";
import Navbar from "./Components/Layouts/Navbar";
import CreateProfile from "./Components/Profile/Create";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./Components/Alert";
import authToken from "./utils/authToken";
import { loadUser } from "./Actions/Auth";
import EditProfile from "./Components/Profile/EditProfile";
import Experience from "./Components/Profile/Experience";
import Education from "./Components/Profile/Education";
import Post from "./Components/Layouts/Post";
import Posts from "./Components/Layouts/Posts";
import Profile from "./Components/Layouts/Profile";
import Profiles from "./Components/Layouts/Profiles";
import OtherProfile from "./Components/Layouts/OtherProfile";

if (localStorage.token) {
  authToken(localStorage.token);
}
const App = () => {
  const [hideItem,setHideItem] = useState(0)

  const hideIt = ()=>{
    setHideItem(1);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    console.log(store.getState().auth.isAuthenticated)
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar showIt={setHideItem} hideIt={setHideItem} />
          <Routes>
            <Route path="/" exact="true" element={<Landing showItem = {setHideItem}/>} />
          </Routes>

          {
            hideItem === 0 ?
                null :
                (
                    <section className="container">
                      <Alert />
                      <Routes>
                        <Route path="/login" exact="true" element={<Login />} />
                        <Route path="/register" exact="true" element={<Register />} />
                        <Route path="/dashboard" exact="true" element={<Dashboard />} />
                        <Route
                            path="/create-profile"
                            exact={true}
                            element={<CreateProfile />}
                        />
                        <Route
                            path="/edit-profile/:id"
                            exact="true"
                            element={<EditProfile />}
                        />
                        <Route
                            path="/add-experience/:id"
                            exact={true}
                            element={<Experience />}
                        />
                        <Route
                            path="/add-education/:id"
                            exact={true}
                            element={<Education />}
                        />
                        <Route path="/post" exact={true} element={<Post />} />
                        <Route path="/posts" exact={true} element={<Posts />} />
                        <Route path="/profile" exact={true} element={<Profile />} />
                        <Route
                            path="profiles/other-profile"
                            exact={true}
                            element={<OtherProfile />}
                        />
                        <Route path="/profiles" exact={true} element={<Profiles />} />
                      </Routes>
                    </section>
                )
          }
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
