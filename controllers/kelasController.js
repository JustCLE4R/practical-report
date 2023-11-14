const kelasModel = require('../models/kelasModel');

const kelasController = {
  getAllKelas: (req, res) => {
    kelasModel.getAllKelas((err, result) => {
      if(err){
        req.flash('error', 'Ada masalah saat mengambil database (getAllKelas) ' + err)
        res.render('error/404')
      }

      if(result == null){
        req.flash('error', 'Data kelas tidak ditemukan')
        res.render('error/404')
      }
      else{
        res.render('kelas', {datas: result})
      }
    })
  },

  getKelas: (req, res) => {
    let id = req.params.id_kelas
    kelasModel.getKelasById(id, (err, result) => {
      if(err){
        req.flash('error', 'Ada masalah saat mengambil database (getKelas) ' + err)
        res.render('error/404')
      }

      if(result == null){
        req.flash('error', 'Data kelas tidak ditemukan')
        res.render('error/404')
      }
      else{
        res.render('kelas/result', {datas: result})
      }
    })
  }









}

module.exports = kelasController;