const kelasModel = require('../models/kelasModel');

const kelasController = {
  getAllKelas: (req, res) => {
    res.render('kelas')
  },

  getKelas: (req, res) => {
    res.render('kelas/result')
  },









}

module.exports = kelasController;