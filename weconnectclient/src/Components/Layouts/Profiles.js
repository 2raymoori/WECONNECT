import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadOtherProfile } from "../../Actions/Profile.Action";

const Profiles = (props) => {
  useEffect(() => {
    console.log(props.profiles.profiles);
  });
  return (
    <div>
      <h1 class="large text-primary">Developers</h1>
      <p class="lead">
        <i class="fab fa-connectdevelop"></i> Browse and connect with developerssss
      </p>
      {props.profiles.profiles.length > 0 ? (
        <div class="profiles">
          {props.profiles.profiles.map((e) => {
            return (
              <div class="profile bg-light">
                <img
                  class="round-img"
                  src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                  alt=""
                />
                <div>
                  <h2>{`${e.user.firstName} ${e.user.lastName}`}</h2>
                  <p>{`${e.status} at ${e.company}`}</p>
                  <p>Seattle, WA</p>
                  <Link
                    onClick={() => {
                      props.loadOtherProfile(e);
                    }}
                    to="other-profile"
                    class="btn btn-primary"
                  >
                    View Profile
                  </Link>
                </div>
                <ul>
                  {e.skills.map((data) => {
                    return (
                      <li class="text-primary">
                        <i class="fas fa-check"></i> {data}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        "no Profiles"
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  profiles: state.p,
});
export default connect(mapStateToProps, { loadOtherProfile })(Profiles);
