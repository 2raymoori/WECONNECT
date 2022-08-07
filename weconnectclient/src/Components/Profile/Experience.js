import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { addExperience } from "../../Actions/Profile.Action";

const Experience = (props) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const captureData = (e) => {
    console.log("Somethign is happeningi...");
    const curVal = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: curVal,
    });
  };
  const captureCheckbox = (e) => {
    e.target.checked
      ? setFormData({
          ...formData,
          current: true,
        })
      : setFormData({
          ...formData,
          current: false,
        });
  };
  const submitData = (e) => {
    e.preventDefault();
    props.addExperience(formData, id);
    console.log("Fomr is Submitting. ");
    console.log(formData);
  };
  return (
    <div>
      <h1 class="large text-primary">Add An Experience</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={submitData}>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            value={formData.title}
            onChange={captureData}
            name="title"
            required
          />
        </div>
        <div class="form-group">
          <input
            value={formData.company}
            onChange={captureData}
            type="text"
            placeholder="* Company"
            name="company"
            required
          />
        </div>
        <div class="form-group">
          <input
            value={formData.location}
            onChange={captureData}
            type="text"
            placeholder="Location"
            name="location"
          />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input
            value={formData.from}
            onChange={captureData}
            type="date"
            name="from"
            required
          />
        </div>
        <div class="form-group">
          <p>
            <input
              onChange={captureCheckbox}
              type="checkbox"
              name="current"
              value=""
            />
            Current Job
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input
            value={formData.to}
            onChange={captureData}
            type="date"
            name="to"
            disabled={formData.current}
          />
        </div>
        <div class="form-group">
          <textarea
            required
            value={formData.description}
            onChange={captureData}
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </div>
  );
};
export default connect(null, { addExperience })(Experience);
