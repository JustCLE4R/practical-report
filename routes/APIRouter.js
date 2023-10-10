const express = require('express');
const router = express.Router();
const APIController = require('../controllers/APIController');

router.get('/mahasiswa', APIController.mahasiswa)

router.get('/mahasiswa/:nim', APIController.mahasiswaStatus)

router.get('/aslab', APIController.asistenLab)

router.get('/laboran', APIController.laboran)

router.get('/dosen', APIController.dosen)







module.exports = router;