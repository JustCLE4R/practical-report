const dashboardModel = require('../models/dashboardModel');


const dashboardController = {
  logout: (req, res) => {
    req.logout((err) => {
      if(err){return next(err)}
      res.redirect('/login')
    });
  },

  getDashboard: (req, res) => {
    let amounts
    dashboardModel.getAmount((err, result) => {
      if(err){
        req.flash('error','Ada masalah saat mengambil data dari database (getAmount) ' + err)
        res.render('dashboard')
      }
      else{
        amounts = result
      }
    })
    dashboardModel.getAllAdmin((err, result) =>{
      if(err){
        req.flash('error','Ada masalah saat mengambil data dari database (getAllAdmin) ' + err)
        res.render('dashboard')
      }
      else{
        res.render('dashboard', {amount: amounts, admin: result})
      }
    })
  },

  getDataMhs: (req, res) => {
    let nim = req.body.nim,
        role = req.user.role,
        id = req.user.id

    dashboardModel.getMhsByNimRole(nim, role, id, (err, result) => {
      if(err || result == null){
        req.flash('error','Mahasiswa Tidak Ada (Tidak dikelas Kamu atau memang tidak ada di database ' + err)
        res.redirect('/dashboard')
      }
      else{
        res.render('dashboard/edit', {datas: result})
      }
    })
  },

  editMhsSts: (req, res) => {
    let updatedStatus = {
          modul_1 : req.body.modul_1,
          modul_2 : req.body.modul_2,
          modul_3 : req.body.modul_3,
          modul_4 : req.body.modul_4,
          modul_5 : req.body.modul_5,
          modul_6 : req.body.modul_6,
          modul_7 : req.body.modul_7,
          modul_8 : req.body.modul_8
    },
        id_sts = req.body.id_status

    dashboardModel.updateMhsSts(id_sts, updatedStatus, (err, result) => {
      if (err) {
        req.flash('error', 'Ada masalah saat mengubah data' + err);
      } else {
        req.flash('success', 'Berhasil mengubah data');
      }
      res.redirect('/dashboard');
    });
  }







}
module.exports = dashboardController;