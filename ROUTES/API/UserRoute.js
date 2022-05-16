const express = require('express');
const {addUser,deleteUser,modifyUser,allUser,getUser} = require('../../CONTROLLERS/UserCtrl');
const authenticate = require('../../MiddleWare/auth');
const {check} = require('express-validator/check')

const Router = express.Router();

Router.get("/users",[[
    check("fName","Sorry First Name is required...").not().isEmpty(),
    check("lName","Sorry last Name is required").not().isEmpty(),
    check("email","Sorry Please provide a Valid Email for user registration.").isEmail(),
    check("confirmPass","Please Confirm your password").not().isEmpty(),
    check("password","Sorry Pleae Provide a valid password").isLength({min:6})
],authenticate],allUser);
Router.get("",getUser);
Router.post("",[
    [
    check("fName","Sorry First Name is required...").not().isEmpty(),
    check("lName","Sorry last Name is required").not().isEmpty(),
    check("email","Sorry Please provide a Valid Email for user registration.").isEmail(),
    check("password","Sorry Pleae Provide a valid password").isLength({min:6})
],authenticate],addUser);
Router.put("",modifyUser);
Router.delete("",deleteUser);

module.exports = Router;
