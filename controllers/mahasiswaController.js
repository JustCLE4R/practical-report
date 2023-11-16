const mahasiswaModel = require('../models/mahasiswaModel');

const mahasiswaController = {
  getMhs: (req, res) => {
    let checkQuery = req.query.nim
    
    if(checkQuery){
      mahasiswaModel.getMhsByNim(checkQuery, (err, result) => {
        if(err){
          req.flash('error', 'Ada masalah saat mengambil database (getMhsByNim) ' + err)
          res.redirect('/')
        }
        
        if(result.length <= 0){
          req.flash('error', 'Mahasiswa dengan nim <strong>'+ checkQuery +'</strong> belum masuk dikelas dan/atau tidak ada di database.')
          res.redirect('/')
        }
        else{
          res.render('mahasiswa/result', {datas: result})
        }
      })
    }
    else{
      res.redirect("mahasiswa")
    }
  },





  
}
module.exports = mahasiswaController;