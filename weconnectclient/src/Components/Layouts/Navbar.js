import { connect } from "react-redux";
import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../Actions/Auth";

const Navbar = (props) => {
  const authLinks = () => {
    return (
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/profile">My Profile</Link>
        </li>
        <li>
          <Link to="/profiles">Other Profiles</Link>
        </li>
        <li>
          <Link to="/post">My Posts</Link>
        </li>
        <li>
          <Link to="/posts">Other Posts</Link>
        </li>
        <li>
          <Link to="/login" onClick={props.logout}>
            Logout
          </Link>
        </li>
      </ul>
    );
  };
  const guestLinks = () => {
    return (
      <ul>
        <li>
          <a href="#!">Developers</a>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    );
  };
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {/* {!props.auth.loading && (
        <Fragment>
          {props.auth.isAuthenticated ? authLinks : guestLinks}
        </Fragment>
      )} */}
      {props.auth.isAuthenticated ? authLinks() : guestLinks()}
    </nav>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
