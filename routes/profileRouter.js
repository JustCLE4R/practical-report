const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController')

router
  .route('/')
  .get(profileController.profile) //daftar admin

router
  .route('/:role/:id')
  .get(profileController.profileIndividual) //profile individual


  module.exports = router;