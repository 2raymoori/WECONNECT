import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { uProfile } from "../../Actions/Profile.Action";

const Dashboard = (props) => {
  const [profile, setProfile] = useState({});
  const [loading,setLoading] = useState(true);
  const loadProfile = async () => {
    try {
      const res = await axios.get("/api/profile/me");
      // console.log(res.data.data[0].msg);
      const curProfile = res.data.data[0].msg;
      console.log(curProfile)
      setProfile((profile) => ({
        ...profile,
        ...curProfile,
      }));
      setLoading(false)
    } catch (error) {}
  };

  useEffect(() => {
    loadProfile();
    console.log(profile);
  }, []);
  if (props.auth.isAuthenticated) {
    //
    return loading ? (
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
          <Fragment>
                  
      <p class="lead"><i class="fas fa-user"></i> Welcome <i>{props.auth.user && props.auth.user.firstName}</i></p>
      <div class="dash-buttons">
        <a href="edit-profile.html" class="btn btn-light"
          ><i class="fas fa-user-circle text-primary"></i> Edit Profile</a
        >
        <a href="add-experience.html" class="btn btn-light"
          ><i class="fab fa-black-tie text-primary"></i> Add Experience</a
        >
        <a href="add-education.html" class="btn btn-light"
          ><i class="fas fa-graduation-cap text-primary"></i> Add Education</a
        >
      </div>

      <h2 class="my-2">Experience Credentials</h2>

      {profile.education.length ===0 ? (<div>
          <h2>Sorry There is no Experience yet in your profile.</h2>
          <h2>Kindly click on Add Experience to add an Experience</h2>
          </div>
        ):
      (
      <table class="table">
        <thead>
          <tr>
            <th>Company</th>
            <th class="hide-sm">Title</th>
            <th class="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {profile.experience.map(e=>{
            return(<tr>
            <td>{e.company}</td>
            <td class="hide-sm">{e.title}</td>
            <td class="hide-sm">
              {e.from.split("T")[0]} - {e.current ?   ("Now"):(e.to.split("T")[0])}
            </td>
            <td>
              <button class="btn btn-danger">
                Delete
              </button>
            </td>
          </tr>)
          })
        }
        </tbody>
      </table>)
    }

      <h2 class="my-2">Education Credentials</h2>
      {
        profile.education.length === 0 ? (<div>
          <h2>Sorry There is no Experience yet in your profile.</h2>
          <h2>Kindly click on Add Experience to add an Experience</h2>
          </div>):(
<table class="table">
          <thead>
            <tr>
              <th>School</th>
              <th class="hide-sm">Degree</th>
              <th class="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {profile.education.map(e=>{
              return(
                <tr>
              <td>{e.school}</td>
              <td class="hide-sm">{e.degree}</td>
              <td class="hide-sm">
                {e.from.split("T")[0]} - {e.current ?   ("Now"):(e.to.split("T")[0])}
              </td>
              <td>
                <button class="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
              )
            })}
          </tbody>
        </table>

        )
      }
        <div class="my-2">
            <button class="btn btn-danger">
                <i class="fas fa-user-minus"></i>

                Delete My Account
            </button>
          </div>
          </Fragment>
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
