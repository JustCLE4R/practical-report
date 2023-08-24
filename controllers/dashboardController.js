const dashboardModel = require('../models/dashboardModel');


const dashboardController = {
  getDashboard: (req, res) => {
    var amounts
    dashboardModel.getAmount((err, result) => {
      if(err){
        req.flash('error','Ada masalah saat mengambil data dari database (getAmount)')
        res.render('dashboard')
      }
      else{
        amounts = result
      }
    })
    dashboardModel.getAllAdmin((err, result) =>{
      if(err){
        req.flash('error','Ada masalah saat mengambil data dari database (getAllAdmin)')
        res.render('dashboard')
      }
      else{
        res.render('dashboard', {amount: amounts, admin: result})
      }
    })

  },



}

module.exports = dashboardController;