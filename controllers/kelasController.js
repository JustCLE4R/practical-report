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

  getKelas: async(req, res) => {
    let id = req.params.id_kelas
    try {
      const kelasDetail = await new Promise((resolve, reject) => {
        kelasModel.getKelasDetailById(id, (err, result) => {
          if(err){
            req.flash('error', 'Ada masalah saat mengambil database (getKelasDetail) ' + err)
            reject(err)
          }
  
          if(result == null){
            req.flash('error', 'Kelas tidak ditemukan')
            reject('Kelas tidak ditemukan')
          }
          else{
            resolve(result)
          }
        })
      })
  
      const kelasMhs = await new Promise((resolve, reject) => {
        kelasModel.getKelasById(id, (err, result) => {
          if(err){
            req.flash('error', 'Ada masalah saat mengambil database (getKelas) ' + err)
            reject(err)
          }
  
          if(result == null){
            req.flash('error', 'Tidak/Belum ada mahasiswa di kelas ini, jika merasa harusnya ini tidak terjadi segera hubungi asisten lab yang bersangkutan')
            reject('Tidak/Belum ada mahasiswa di kelas ini')
          }
          else{
            resolve(result)
          }
        })
      })
  
      if(kelasDetail && kelasMhs){
        res.render('kelas/result', {datas: kelasDetail, mahasiswa: kelasMhs})
      }
    } catch (error) {
      res.render('error/404')
    } 
  },









}

module.exports = kelasController;