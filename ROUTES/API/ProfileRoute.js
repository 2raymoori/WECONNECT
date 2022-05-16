const express = require('express');
const Router = express.Router();
const {addProfile,deleteProfile,modifyProfile,allProfile,profile} = require('../../CONTROLLERS/ProfileCtrl');

Router.get("/allUser",allProfile)
Router.get("/user",profile)
Router.post("/add",addProfile)
Router.delete("/delete",deleteProfile)
Router.put("/update",modifyProfile)


module.exports = Router