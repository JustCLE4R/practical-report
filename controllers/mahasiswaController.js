const mahasiswaModel = require('../models/mahasiswaModel');

const mahasiswaController = {
  getMahasiswa: (req, res) => {
    let page = req.query.page
    mahasiswaModel.getAllMhs(page, (err, result) => {
      if (err) {
        req.flash('error','Ada masalah saat mengambil database (getAllMhs) ' + err)
        res.redirect('/')
      }
      else{
        const prevPage = page > 1 ? page - 1 : 1;
        const nextPage = parseInt(page) + 1;

        res.render('mahasiswa', {
          datas: result,
          pagination:{
            currentPage: page,
            prevPage: prevPage,
            nextPage: nextPage
          }
        })
      }
    })
  }






}
module.exports = mahasiswaController;