const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController')

router
  .route('/')
  .get(profileController.profile)

router
  .route('/:role/:id')
  .get(profileController.profileIndividual)


  module.exports = router;