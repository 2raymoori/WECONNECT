import React, { useEffect } from "react";
import { connect } from "react-redux";
const Profile = (props) => {
  useEffect(() => {
    console.log(props.profile);
  });
  return (
    <div>
      <a href="profiles.html" class="btn btn-light">
        Back To Profiles
      </a>

      <div class="profile-grid my-1">
        {/* <!-- Top --> */}
        <div class="profile-top bg-primary p-2">
          <img
            class="round-img my-1"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          <h1 class="large">
            {props.profile.userProfile.msg.user.firstName}{" "}
            {props.profile.userProfile.msg.user.lastName}
          </h1>
          <p class="lead">{props.profile.userProfile.msg.status}</p>
          <p>Seattle, WA</p>
          {props.profile.userProfile.msg.social && (
            <div class="icons my-1">
              {props.profile.userProfile.msg.social.twitter ? (
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-twitter fa-2x"></i>
                </a>
              ) : (
                ""
              )}
              {props.profile.userProfile.msg.social.facebook && (
                <a href="lot" target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-facebook fa-2x"></i>
                </a>
              )}
              {props.profile.userProfile.msg.social.linkedin && (
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-linkedin fa-2x"></i>
                </a>
              )}
              {props.profile.userProfile.msg.social.youtube && (
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-youtube fa-2x"></i>
                </a>
              )}
              {props.profile.userProfile.msg.social.instagram && (
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-instagram fa-2x"></i>
                </a>
              )}
            </div>
          )}
        </div>

        {/* <!-- About --> */}
        <div class="profile-about bg-light p-2">
          <h2 class="text-primary">
            {props.profile.userProfile.msg.user.firstName}'s Bio
          </h2>
          <p>{props.profile.userProfile.msg.bio}</p>
          <div class="line"></div>
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
            {props.profile.userProfile.msg.skills.map((e) => {
              return (
                <div class="p-1">
                  <i class="fa fa-check"></i> {e}
                </div>
              );
            })}
          </div>
        </div>

        {/* <!-- Experience --> */}
        <div class="profile-exp bg-white p-2">
          <h2 class="text-primary">Experience</h2>
          {props.profile.userProfile.msg.experience.length === 0 ? (
            <div>
              <h2>Sorry No Experience added yet.</h2>
            </div>
          ) : (
            <div>
              {props.profile.userProfile.msg.experience.map((e) => {
                return (
                  <div>
                    <h3 class="text-dark">{e.company}</h3>
                    <p>
                      {e.from.split("T")[0]} -{" "}
                      {e.current ? "Current" : e.to.split("T")[0]}
                    </p>
                    <p>
                      <strong>Position: </strong>
                      {e.title}
                    </p>
                    <p>
                      <strong>Description: </strong>
                      {e.description}
                    </p>
                    <hr />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* <!-- Education --> */}
        <div class="profile-edu bg-white p-2">
          <h2 class="text-primary">Education</h2>
          {props.profile.userProfile.msg.education.length === 0 ? (
            <div className="profile-edu-box">
              <h2>Sorry No Education added yet.</h2>
            </div>
          ) : (
            <div>
              {props.profile.userProfile.msg.education.map((e) => {
                return (
                  <div>
                    <h3>{e.school}</h3>
                    <p>
                      {e.from.split("T")[0]} -
                      {e.current ? "Current" : e.to.split("T")[0]}
                    </p>
                    <p>
                      <strong>Degree: </strong>
                      {e.degree}
                    </p>
                    <p>
                      <strong>Field Of Study: </strong>
                      {e.fieldofstudy}
                    </p>
                    <p>
                      <strong>Description: </strong>
                      {e.description}
                    </p>
                    <hr />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* <!-- Github --> */}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  profile: state.p,
});

export default connect(mapStateToProps)(Profile);