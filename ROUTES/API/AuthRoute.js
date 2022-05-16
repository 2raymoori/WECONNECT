const express = require('express');
const { login } = require('../../CONTROLLERS/AuthCtrl');
const Router = express.Router();
Router.post("/login",login)



module.exports = Router