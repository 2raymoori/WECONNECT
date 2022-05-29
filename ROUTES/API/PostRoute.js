const express = require('express');
const { check } = require('express-validator/check');
const authenticate = require('../../MiddleWare/auth')
const {addpost,deletepost,modifypost,allpost,myposts,post} = require('../../CONTROLLERS/PostCtrl');
const Router = express.Router();
Router.get("/allPosts",authenticate,allpost)
Router.get("/myposts",authenticate,authenticate,myposts)
Router.get("/post/:id",authenticate,post)
Router.post("/add",[[
    check("description","Sorry Description is required").not().isEmpty(),
    check("title","Sorry Title is required").not().isEmpty()
],authenticate],addpost)
Router.delete("/:id",authenticate,deletepost)
Router.put("/:id",authenticate,modifypost)


module.exports = Router
