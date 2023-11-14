const express = require('express');
const router = express.Router();
const kelasController = require('../controllers/kelasController');

router
  .route('/')
  .get(kelasController.getAllKelas)


router
  .route('/:id_kelas')
  .get(kelasController.getKelas)




module.exports = router