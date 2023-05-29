import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  uProfile,
  deleteProfile,
  deleteEducation,
  deleteExperience,
} from "../../Actions/Profile.Action";
import Modal from "react-bootstrap/Modal";

const Dashboard = (props) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [showDelete,setShowDelete] = useState(false);
  const [deleteData,setDeleteData] = useState({deletionType:0,profileId:"",id2:""});



  const confirmDelete = (deletionType, profileId, id2) => {
    if (deleteData.deletionType === 1) {
      // Experience to delete
        props.deleteExperience(deleteData.profileId, deleteData.id2);

    } else {
      // Educationn to delete
        props.deleteEducation(deleteData.profileId, deleteData.id2);
    }
    handleClose();
  };
  const deleteProfile = (profileId) => {
    if (window.confirm("Are you sure you want to delete your Profile?")) {
      props.deleteProfile(profileId);
    }
  };
  const loadProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/profile/me");
      // console.log(res.data.data[0].msg);
      const curProfile = res.data.data[0].msg;
      console.log(curProfile);
      setProfile((profile) => ({
        ...profile,
        ...curProfile,
      }));
      setLoading(false);
    } catch (error) {}
  };
  const handleClose = ()=>{
    setShowDelete(false);
  }
  const deleteItem = (deletionType, profileId, id2)=>{
      setShowDelete(true);
    setDeleteData({deletionType,profileId,id2});
  }

  useEffect(() => {
    loadProfile();
    console.log(props.p);
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
        <Modal show={showDelete} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>Are you sure you want to delete this Post?</h2>
            <div>

              <button onClick={handleClose} className={'btn btn-primary'}>Cancel</button>
              <button onClick={confirmDelete} className={'btn btn-danger'}>Confirm</button>
            </div>
          </Modal.Body>
        </Modal>

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
            <p class="lead">
              <div className="imgContainer">
              <img
                  src={props.auth.user.profileImg ?`http://localhost:5001/pImages/${props.auth.user.profileImg}`:"https://ionicframework.com/docs/img/demos/avatar.svg"}
                   height={50}  width={10} />
              </div>
               Welcome{" "}
              <i>{props.auth.user && props.auth.user.firstName}</i>
            </p>
            <div class="dash-buttons">
              <Link to={`/edit-profile/${profile._id}`} class="btn btn-light">
                <i class="fas fa-user-circle text-primary"></i> Edit Profile
              </Link>
              <Link to={`/add-experience/${profile._id}`} class="btn btn-light">
                <i class="fab fa-black-tie text-primary"></i> Add Experience
              </Link>
              <Link to={`/add-education/${profile._id}`} class="btn btn-light">
                <i class="fas fa-graduation-cap text-primary"></i> Add Education
              </Link>
            </div>

            <h2 class="my-2">Experience Credentials</h2>

            {profile.experience.length === 0 ? (
              <div>
                <p className={"text-center fw-bold text-danger"}>Sorry There is no Experience yet in your profile.</p>
                <p className={"text-center fw-bold text-danger"}>Kindly click on Add Experience to add an Experience</p>
              </div>
            ) : (
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
                  {profile.experience.map((e) => {
                    return (
                      <tr>
                        <td>{e.company}</td>
                        <td class="hide-sm">{e.title}</td>
                        <td class="hide-sm">
                          {e.from.split("T")[0]} -{" "}
                          {e.current ? "Now" : e.to.split("T")[0]}
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              deleteItem(1, profile._id, e._id);
                            }}
                            class="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            <h2 class="my-2">Education Credentials</h2>
            {profile.education.length === 0 ? (
              <div>
                <p className={"text-center fw-bold text-danger"}>Sorry There is no Education yet in your profile.</p>
                <p className={"text-center fw-bold text-danger"}>Kindly click on Add Education to add an Education</p>
              </div>
            ) : (
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
                  {profile.education.map((e) => {
                    return (
                      <tr>
                        <td>{e.school}</td>
                        <td class="hide-sm">{e.degree}</td>
                        <td class="hide-sm">
                          {e.from.split("T")[0]} -{" "}
                          {e.current ? "Now" : e.to.split("T")[0]}
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              deleteItem(0, profile._id, e._id);
                            }}
                            class="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {/*<div class="my-2">*/}
            {/*  <button*/}
            {/*    onClick={() => {*/}
            {/*      deleteProfile(profile._id);*/}
            {/*    }}*/}
            {/*    class="btn btn-danger"*/}
            {/*  >*/}
            {/*    <i class="fas fa-user-minus"></i>*/}
            {/*    Delete My Account*/}
            {/*  </button>*/}
            {/*</div>*/}
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
export default connect(mapStateToProps, {
  uProfile,
  deleteProfile,
  deleteEducation,
  deleteExperience,
})(Dashboard);
