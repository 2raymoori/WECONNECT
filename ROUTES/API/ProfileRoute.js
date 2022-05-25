const express = require('express');
const { check } = require('express-validator/check');
const Router = express.Router();
const {addProfile,deleteProfile,modifyProfile,allProfile,profile} = require('../../CONTROLLERS/ProfileCtrl');
const authenticate = require('../../MiddleWare/auth');

Router.get("/allUser",allProfile)
Router.get("/user",profile)
Router.post("/add",[[
    check('skills',"Sorry atleast a Skill is required for a profile").not().isEmpty()
],authenticate],addProfile)
Router.delete("/delete/:id",authenticate,deleteProfile)
Router.put("/update",modifyProfile)


module.exports = Router
