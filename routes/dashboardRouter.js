const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const passport = require('passport');

router
  .route('/')
  .get(passport.checkAuthentication, dashboardController.getDashboard)
  // .get(dashboardController.getDashboard)

router
  .route('/results')
  .get()
  .post(dashboardController.getDataMhs)

router
  .route('/logout')
  .get(passport.checkAuthentication, dashboardController.logout)


module.exports = router; 