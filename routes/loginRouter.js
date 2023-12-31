const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const passport = require('passport');
const setNoCache = (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
};

router
  .route('/')
  .get(setNoCache, passport.notAuthenticated, loginController.login) //login page
  .post(passport.authenticate('local', { //cek username password
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  }))




module.exports = router; 