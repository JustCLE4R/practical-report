const landingModel = require('../models/landingModel');

const landingController = {
  indexLanding: (req, res) => {
    landingModel.getAllAdmin((err, result) => {
      if(err){
        req.flash('error','Ada masalah saat mengambil database LandingPage (getAllAdmin) ' + err)
        res.redirect('/404')
      }
      else{
        res.render('landingpage', {datas: result})
      }
    })
  },









}
module.exports = landingController;