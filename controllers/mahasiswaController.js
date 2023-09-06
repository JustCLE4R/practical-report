const mahasiswaModel = require('../models/mahasiswaModel');

const mahasiswaController = {
  getMhs: (req, res) => {
    if(!req.query.page || isNaN(req.query.page) || req.query.page <= 0) { //cek valid URL
      return res.redirect('/mahasiswa?page=1');
    }

    let page = parseInt(req.query.page) //ambil page berapa sekarang dan ubah ke integer
    let limit = 20 //set limit per page
    mahasiswaModel.getAllMhs(page, limit, (err, result) => {
      if (err) {
        req.flash('error','Ada masalah saat mengambil database (getAllMhs) ' + err)
        res.redirect('/')
      }

      if (result.length == 0 && page > 1) {
        return res.redirect(`/mahasiswa?page=1`);
      }
      else{
        const prevPage = page > 1 ? page - 1 : 1; //cek untuk prev
        const nextPage = page + 1;

        res.render('mahasiswa', {
          datas: result,
          pagination:{
            currentPage: page,
            prevPage: prevPage,
            nextPage: nextPage,
            limit: limit
          }
        })
      }
    })
  },

  getMhsByNim: (req, res) => { //get mahasiswa individual
    let search = req.body.search;
    mahasiswaModel.getMhsByNim(search, (err, result) => {
      if (err) {
        req.flash('error','Ada masalah saat mengambil database (getMhsByNim)'+ err)
        res.redirect('/mahasiswa')
      }

      if (result == null) {
        req.flash('error','Mahasiswa tidak ditemukan')
        res.redirect('/mahasiswa')
      }else{
        res.render('mahasiswa', {datas: result})
      }
    })
  }





  
}
module.exports = mahasiswaController;