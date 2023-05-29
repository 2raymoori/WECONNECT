import { connect } from "react-redux";
import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../Actions/Auth";

const Navbar = (props) => {
    useEffect(() => {
        console.log(props);
    },[]);
  const authLinks = () => {
    return (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li>
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
            {props.p.userProfile?.msg == null?  null: (<Link className="nav-link" to="/profile">My Profile</Link>)}
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profiles">Other Profiles</Link>
        </li>
           <li className="nav-item">
              <Link className="nav-link" to="/post">My Posts</Link>
          </li>
        <li className="nav-item">
          <Link className="nav-link" to="/posts">Other Posts</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login" onClick={props.logout}>
            Logout
          </Link>
        </li>
      </ul>
    );
  };
  const guestLinks = () => {
    return (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" href="/">Developers</a>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={()=>{props.hideIt()}} to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={()=>{props.hideIt()}} to="/login">Login</Link>
        </li>
      </ul>
    );
  };
  return (
      <>

          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container-fluid d-flex justify-content-between">
                  <h1 className="navbar-brand">
                      <Link className={"nav-item"} to="/" onClick={()=>{props.showIt(0)}} >
                          <i className="fas fa-code"></i> Let's Connect
                      </Link>
                  </h1>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                          aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div  className="collapse navbar-collapse" id="navbarSupportedContent">
                      {props.auth.isAuthenticated ? authLinks() : guestLinks()}
                  </div>
              </div>
          </nav>
          </>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
    p:state.p,
});
export default connect(mapStateToProps, { logout })(Navbar);
