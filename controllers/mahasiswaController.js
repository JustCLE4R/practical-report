const mahasiswaModel = require('../models/mahasiswaModel');

const mahasiswaController = {
  getMhs: (req, res) => {
    let checkParams = req.query.nim
    
    if(checkParams){
      mahasiswaModel.getMhsByNim(checkParams, (err, result) => {
        if(err){
          req.flash('error', 'Ada masalah saat mengambil database (getMhsByNim) ' + err)
          res.redirect('/mahasiswa')
        }
        
        if(result.length <= 0){
          req.flash('error', 'Mahasiswa dengan nim <strong>'+ checkParams +'</strong> tidak ditemukan di database.')
          res.redirect('/mahasiswa')
        }
        else{
          res.render('mahasiswa/result', {datas: result})
        }
      })
    }
    else{
      res.render("mahasiswa")
    }
  }





  
}
module.exports = mahasiswaController;