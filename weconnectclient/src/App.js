import { Fragment, useEffect } from "react";
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
import Create from "./Components/Profile/Create";

if (localStorage.token) {
  authToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path="/" exact="true" element={<Landing />} />
          </Routes>
          <section className="container">
            <Alert />
            <Routes>
              <Route path="/login" exact="true" element={<Login />} />
              <Route path="/register" exact="true" element={<Register />} />
              <Route path="/dashboard" exact="true" element={<Dashboard />} />
              <Route
                path="create-profile"
                exact={true}
                element={<CreateProfile />}
              />
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
