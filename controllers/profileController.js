const profileModel = require('../models/profileModel')

const profileController = {
  profile: (req, res) => { //menampilkan page profile
    res.render('profile');
  },

  profileIndividual: (req, res) => { //menampilkan page profile individual
    let role = req.params.role, //mengambil role dari URL(params)
        id = req.params.id, //mengambil id dari URL(params)
        urlCheck = ['aslab', 'laboran', 'dosen']; //mendefinisikan URL yang dapat diakses

    if (!isNaN(role) || isNaN(id) || !urlCheck.includes(role)) { //cek URL VALID
      return (
        req.flash('error', 'Invalid role and/or id'), 
        res.status(404).render('error/404')
      )
    }

    profileModel.getProfile(role, id, (err, result) => { //mengambil profile admin dari database
      if (err || result === null) {
        req.flash('error', role + '/' + id + ' return ' + err)
        res.status(404).render('error/404')
      }
      else{
        res.send({datas: result})
      }
    })

  }
}

module.exports = profileController;