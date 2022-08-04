import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { uProfile } from "../../Actions/Profile.Action";

const Dashboard = (props) => {
  const [profile, setProfile] = useState({});
  const loadProfile = async () => {
    try {
      const res = await axios.get("/api/profile/me");
      // console.log(res.data.data[0].msg);
      const curProfile = res.data.data[0].msg;
      setProfile((profile) => ({
        ...profile,
        ...curProfile,
      }));
    } catch (error) {}
  };

  useEffect(() => {
    loadProfile();
    console.log(profile);
  }, []);
  if (props.auth.isAuthenticated) {
    //
    return props.p.loading && props.p.msg === null ? (
      <div>
        <img
          src="https://icon-library.com/images/loading-icon-animated-gif/loading-icon-animated-gif-7.jpg"
          alt="spinner"
          style={{ display: "block ", margin: "auto", width: "200px" }}
        />
      </div>
    ) : (
      <Fragment>
        {}
        <h1 className="large text-primary">Dashboard</h1>
        <p>
          <i>Welcome {props.auth.user && props.auth.user.firstName}</i>
        </p>
        {/* props.profile.profile.msg */}
        {/* props.profile.profile */}
        {profile.bio === undefined ? (
          <Fragment>
            <p>You have no profile yet in the System. Kindly create one.</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create
            </Link>
          </Fragment>
        ) : (
          <Fragment>has</Fragment>
        )}
      </Fragment>
    );
  } else {
    return <Navigate replace to="/login" />;
  }
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  p: state.p,
});
export default connect(mapStateToProps, { uProfile })(Dashboard);

/*
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { uProfile } from "../../Actions/Profile.Action";

const Dashboard = (props) => {
  const [profile, setProfile] = useState({});

  const loadProfile = async () => {
    try {
      const res = await axios.get("/api/profile/me");
      // console.log(res.data.data[0].msg);
      const curProfile = res.data.data[0].msg;
      setProfile((profile) => ({
        ...profile,
        ...curProfile,
      }));
    } catch (error) {}
  };

  useEffect(() => {
    loadProfile();
    console.log(profile);
  }, []);

  return <div>DASHBOARD {`${profile.bio === undefined}`}</div>;
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  p: state.p,
});
export default connect(mapStateToProps, { uProfile })(Dashboard);

*/
