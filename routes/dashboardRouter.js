const express = require('express');
const router = express.Router();
const dashboard = require('../controllers/dashboardController');
const passport = require('passport');

router
  .route('/')
  .get(passport.checkAuthentication, dashboard.getDashboard)
  // .get(dashboard.getDashboard)

router
  .route('/logout')
  .get(passport.checkAuthentication, dashboard.logout)


module.exports = router; 