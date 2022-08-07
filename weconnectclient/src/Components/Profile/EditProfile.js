import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { updateProfile } from "../../Actions/Profile.Action";

const EditProfile = (props) => {
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
    instagram: "",
  });
  const { id } = useParams();
  const captureVal = (e) => {
    let newVal = e.target.value;
    console.log(newVal);
    setFormFields({
      ...formFields,
      [e.target.name]: newVal,
    });
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/profile/curprofile/${id}`
      );
      console.log("============================");
      const userProfile = res.data.data[0].msg;
      console.log(userProfile);
      const xyz = {
        company: userProfile.company,
        bio: userProfile.bio,
        website: userProfile.website,
        skills: userProfile.skills.join(","),
      };
      if (userProfile.social !== undefined) {
        xyz.facebook = userProfile.social.facebook || "";
        xyz.youtube = userProfile.social.youtube || "";
        xyz.twitter = userProfile.social.twitter || "";
        xyz.linkedin = userProfile.social.linkedin || "";
        xyz.instagram = userProfile.social.instagram || "";
      }
      setFormFields(xyz);
      console.log("============================");
    } catch (error) {
      console.log("Error Ocured");
      console.log(error);
    }
  };
  const submitProfile = (e) => {
    e.preventDefault();
    props.updateProfile(formFields, id);
  };
  const showHideSocial = () => {
    setShowSocial(!showSocial);
  };

  useState(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's update some information necessary
        to make your profile stand out
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
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                onChange={captureVal}
                value={formFields.instagram}
              />
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

export default connect(null, { updateProfile })(EditProfile);
