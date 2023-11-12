const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const passport = require('passport');
const setNoCache = (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
};

router
  .route('/')
  .get(setNoCache, passport.checkAuthentication, dashboardController.getDashboard) //dashboard

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
  .route('/deleteFromClass')
  .delete(passport.checkAuthentication, dashboardController.deleteMhsFromSts)

router
  .route('/changepassword')
  .get(passport.checkAuthentication, dashboardController.getChangePassword)
  .patch(passport.checkAuthentication, dashboardController.changePassword)




module.exports = router; 