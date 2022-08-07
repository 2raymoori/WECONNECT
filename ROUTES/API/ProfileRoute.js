const express = require("express");
const { check } = require("express-validator/check");
const Router = express.Router();
const {
  curUserProfile,
  addExperience,
  addEducation,
  addProfile,
  deleteProfile,
  modifyProfile,
  allProfile,
  profile,
} = require("../../CONTROLLERS/ProfileCtrl");
const authenticate = require("../../MiddleWare/auth");

Router.get("/allprofile", allProfile);
Router.get("/curprofile/:id", profile);
Router.post(
  "/add",
  [
    [
      check("skills", "Sorry atleast a Skill is required for a profile")
        .not()
        .isEmpty(),
    ],
    authenticate,
  ],
  addProfile
);
Router.delete("/delete/:id", authenticate, deleteProfile);
Router.put("/update/:id", authenticate, modifyProfile);
Router.get("/me", authenticate, curUserProfile);
Router.put(
  "/addedu/:id",
  [
    [
      check("school", "Sorry School is required").not().isEmpty(),
      check("degree", "Sorry degree is required").not().isEmpty(),
      check("fieldofstudy", "Sorry Field of Study is required").not().isEmpty(),
      check("from", "Sorry Starting date is required").isDate(),
    ],
    authenticate,
  ],
  addEducation
);
Router.put(
  "/addexperience/:id",
  [
    [
      check("title", "Sorry Title is required").not().isEmpty(),
      check("company", "Sorry Company is required").not().isEmpty(),
      check("from", "Sorry Starting date is required").isDate(),
    ],
    authenticate,
  ],
  addExperience
);

module.exports = Router;
