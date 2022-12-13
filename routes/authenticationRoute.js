const express = require('express');
const router = express.Router();
const passport = require('passport');
const AuthenticateUser = require('../controllers/AuthenticateUserController');

router.post("/register",AuthenticateUser.register);
router.post("/login",AuthenticateUser.login);
router.get("/user",passport.authenticate('jwt', { session: false }),AuthenticateUser.getUser);

module.exports = router