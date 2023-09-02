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
        req.flash('error','Ada masalah saat mengambil database (getAmount) ' + err)
        res.render('dashboard')
      }
      else{
        amounts = result
      }
    })
    dashboardModel.getAllAdmin((err, result) =>{
      if(err){
        req.flash('error','Ada masalah saat mengambil database (getAllAdmin) ' + err)
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
      if(err){
        req.flash('error','Ada masalah saat mengambil database (getMhsByNimRole) ' + err)
        res.redirect('/dashboard')
      }
      else if(result == null && req.user.role == 'laboran'){
        req.flash('error','Mahasiswa dengan nim <strong>'+ nim +'</strong> tidak ditemukan atau belum ada di <b>Kelas</b> yang seharusnya.')
        res.redirect('/dashboard')
      }
      else if(result == null && req.user.role == 'aslab'){
        dashboardModel.getMhsByNim(nim, (err, result) => {
          if(err){
            req.flash('error','Ada masalah saat mengambil database (getMhsByNim) ' + err)
            res.redirect('/dashboard')
          }
          else if(result == null){
            req.flash('error','Mahasiswa dengan nim <strong>'+ nim +'</strong> tidak ditemukan di database.')
            res.redirect('/dashboard')
          }
          else{
            res.render('dashboard/edit', {datas: result, admin: req.user})
          }
        })
      }
      else{
        res.render('dashboard/edit', {datas: result, admin: req.user})
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
        req.flash('error', 'Ada masalah saat mengubah data (updateMhsSts) ' + err);
      } else {
        req.flash('success', 'Berhasil mengubah data');
      }
      res.redirect('/dashboard');
    });
  },

  getMhsToSts: (req, res) => {
    let nim = req.params.nim

    dashboardModel.getMhsByNim(nim, (err, result) => {
      if(err){
        req.flash('error','Ada masalah saat mengambil database (getMhsByNim) ' + err)
        res.redirect('/dashboard')
      }
      else if(result == null){
        req.flash('error','Mahasiswa dengan nim <strong>'+ nim +'</strong> tidak ditemukan di database.')
        res.redirect('/dashboard')
      }
      else{
        dashboardModel.getMkMhs(nim, (err, result2) => {
          if(err){
            req.flash('error','Ada masalah saat mengambil database (getMkMhs) '+ err)
            res.redirect('/dashboard')
          }
          else{
            result[0].kelas = result2
            res.render('dashboard/add', {datas: result[0], admin: req.user})
          }
        })
        // res.render('dashboard/add', {datas: result[0], admin: req.user})
      }
    });
  },

  addMhsToSts: (req, res) => {
    let insertData = {
          nim : req.params.nim,
          id_mk : req.body.kelas
    };

    dashboardModel.addMhsToSts(insertData, (err, result) => {
      if (err) {
        req.flash('error', 'Ada masalah saat menambahkan data (addMhsToSts) '+ err);
      } else {
        req.flash('success', 'Berhasil menambahkan mata kuliah ke mahasiswa');
      }
      res.redirect('/dashboard');
    });
  },







}
module.exports = dashboardController;