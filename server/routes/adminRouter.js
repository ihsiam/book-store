// dependencies
const express = require('express');
const { register, logIn } = require('../controllers/adminHandler');
const adminRouter = express.Router();

adminRouter.post('/register', register);
adminRouter.post('/login', logIn);

module.exports = adminRouter;