const profileModel = require('../models/profileModel')

const profileController = {
  profile: (req, res) => { //menampilkan page profile
    profileModel.getAllProfile((err, result) => { //mengambil profile admin dari database
      if (err || result === null) {
        req.flash('error', 'return ' + err)
        res.status(404).render('error/404')
      }
      else{
        res.render('profile', {datas: result});
      }
    })
  },

  profileIndividual: (req, res) => { //menampilkan page profile individual
    let role = req.params.role, //mengambil role dari URL(params)
        id = req.params.id, //mengambil id dari URL(params)
        urlCheck = ['aslab', 'laboran', 'dosen'], //mendefinisikan URL yang dapat diakses
        kelas = {};

    if (!isNaN(role) || isNaN(id) || !urlCheck.includes(role)) { //cek URL VALID
      return (
        req.flash('error', 'Invalid role and/or id'), 
        res.status(404).render('error/404')
      )
    }

    profileModel.getKelasByIdRole(id, role, (err, result) => {
      if (err || result === null) {
        req.flash('error', role + '/' + id + ' return ' + err)
        res.status(404).render('error/404')
      }
      else{
        kelas = result
      }
    })

    profileModel.getProfile(role, id, (err, result) => { //mengambil profile admin dari database
      if (err || result === null) {
        req.flash('error', role + '/' + id + ' return ' + err)
        res.status(404).render('error/404')
      }
      else{
        result[0].kelas = kelas
        res.render('profile/profileIndividual', {datas: result})
      }
    })
  },
















}

module.exports = profileController;