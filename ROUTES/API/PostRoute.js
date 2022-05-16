const express = require('express');
const {addpost,deletepost,modifypost,allpost,post} = require('../../CONTROLLERS/PostCtrl');
const Router = express.Router();
Router.get("/allUser",allpost)
Router.get("/user",post)
Router.post("/add",addpost)
Router.delete("/delete",deletepost)
Router.put("/update",modifypost)


module.exports = Router