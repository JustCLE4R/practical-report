const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const passport = require('passport');

router
  .route('/')
  .get(passport.notAuthenticated, loginController.login)
  .post(passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  }))




module.exports = router; 