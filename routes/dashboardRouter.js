const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const passport = require('passport');

router
  .route('/')
  .get(passport.checkAuthentication, dashboardController.getDashboard)
  // .get(dashboardController.getDashboard)

router
  .route('/logout')
  .get(passport.checkAuthentication, dashboardController.logout)

router
  .route('/results')
  .post(passport.checkAuthentication, dashboardController.getDataMhs)
  .patch(passport.checkAuthentication, dashboardController.editMhsSts)

router
  .route('/add/:nim')
  .get(passport.checkAuthentication, dashboardController.getMhsToSts)
  .post(passport.checkAuthentication, dashboardController.addMhsToSts)




module.exports = router; 