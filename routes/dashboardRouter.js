const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const passport = require('passport');

router
  .route('/')
  .get(passport.checkAuthentication, dashboardController.getDashboard) //dashboard
  // .get(dashboardController.getDashboard)

router
  .route('/logout')
  .get(passport.checkAuthentication, dashboardController.logout) //dashboard logout

router
  .route('/results')
  .post(passport.checkAuthentication, dashboardController.getDataMhs) //dashboard results
  .patch(passport.checkAuthentication, dashboardController.editMhsSts) //dashboard edit modul mahasiswa

router
  .route('/add/:nim')
  .get(passport.checkAuthentication, dashboardController.getMhsToSts) //dashboard add
  .post(passport.checkAuthentication, dashboardController.addMhsToSts) //dashboard tambah mahasiswa ke kelas

router
  .route('/changepassword')
  .get(passport.checkAuthentication, dashboardController.getChangePassword)
  .patch(passport.checkAuthentication, dashboardController.changePassword)




module.exports = router; 