const express = require('express');
const router = express.Router();
const mahasiswaController = require('../controllers/mahasiswaController');

router
  .route('/')
  .get(mahasiswaController.getMhs)
  



module.exports = router;