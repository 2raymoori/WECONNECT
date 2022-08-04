import React, { useState } from "react";
import { connect } from "react-redux";
import { addProfile } from "../../Actions/Profile.Action";

const Create = (props) => {
  const [showSocial, setShowSocial] = useState(false);
  const [formFields, setFormFields] = useState({
    status: "",
    company: "",
    location: "",
    website: "",
    skills: "",
    bio: "",
    linkedin: "",
    youtube: "",
    facebook: "",
    twitter: "",
  });
  const captureVal = (e) => {
    let newVal = e.target.value;
    console.log(newVal);
    setFormFields({
      ...formFields,
      [e.target.name]: newVal,
    });
  };
  const submitProfile = (e) => {
    e.preventDefault();

    props.addProfile(formFields);
  };
  const showHideSocial = () => {
    setShowSocial(!showSocial);
  };
  return (
    <div>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={submitProfile}>
        <div className="form-group">
          <select onChange={captureVal} name="status" required>
            <option value="">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            onChange={captureVal}
            value={formFields.company}
            name="company"
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            onChange={captureVal}
            value={formFields.website}
            name="website"
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            onChange={captureVal}
            value={formFields.location}
            name="location"
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            required
            placeholder="* Skills"
            onChange={captureVal}
            value={formFields.skills}
            name="skills"
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            onChange={captureVal}
            value={formFields.bio}
            name="bio"
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            onClick={showHideSocial}
            className="btn btn-light"
            id="btn"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {showSocial && (
          <div className="social-links">
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                onChange={captureVal}
                value={formFields.twitter}
                name="twitter"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                onChange={captureVal}
                value={formFields.facebook}
                name="facebook"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                onChange={captureVal}
                value={formFields.youtube}
                name="youtube"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                onChange={captureVal}
                value={formFields.linkedin}
                name="linkedin"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input type="text" placeholder="Instagram URL" name="instagram" />
            </div>
          </div>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </div>
  );
};

export default connect(null, { addProfile })(Create);
