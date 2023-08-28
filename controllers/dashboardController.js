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
        res.send({datas: result})
      }
    })
  },
}

module.exports = dashboardController;