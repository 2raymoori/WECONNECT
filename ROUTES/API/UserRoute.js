const express = require("express");
const {
  addUser,
  deleteUser,
  modifyUser,
  allUser,
  getUser,
} = require("../../CONTROLLERS/UserCtrl");
const authenticate = require("../../MiddleWare/auth");
const { check } = require("express-validator/check");

const Router = express.Router();

Router.get("/users", allUser);
Router.get("", getUser);

// @Route POST api/users
// @desc Create a new user
// @access public
Router.post(
  "/",
  [
    check("fName", "Sorry First Name is required...").not().isEmpty(),
    check("lName", "Sorry last Name is required").not().isEmpty(),
    check(
      "email",
      "Sorry Please provide a Valid Email for user registration."
    ).isEmail(),
    check("password", "Sorry Pleae Provide a valid password").isLength({
      min: 6,
    }),
  ],
  addUser
);
Router.put("", modifyUser);

module.exports = Router;
