import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { addEducation } from "../../Actions/Profile.Action";

const Education = (props) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    description: "",
    current: false,
  });


  const captureData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
    props.addEducation(formData, id);
    setFormData({
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      description: "",
      current: false,
    })
  };
  return (
    <div>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={submitData}>
        <div className="form-group">
          <input
            value={formData.school}
            onChange={captureData}
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
          />
        </div>
        <div className="form-group">
          <input
            value={formData.degree}
            onChange={captureData}
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
          />
        </div>
        <div className="form-group">
          <input
            reqquired
            value={formData.fieldofstudy}
            onChange={captureData}
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            reqquired
            value={formData.from}
            onChange={captureData}
            type="date"
            name="from"
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              onChange={captureCheckbox}
              value=""
            />{" "}
            Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            value={formData.to}
            onChange={captureData}
            type="date"
            disabled={formData.current}
            name="to"
          />
        </div>
        <div className="form-group">
          <textarea
            reqquired
            value={formData.description}
            onChange={captureData}
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
      </form>
    </div>
  );
};
export default connect(null, { addEducation })(Education);
