const profileModel = require('../models/profileModel')

const profileController = {
  profile: (req, res) => {
    res.render('profile');
  },

  profileIndividual: (req, res) => {
    let role = req.params.role,
        id = req.params.id

    if (!isNaN(role) || isNaN(id)) {
      return (
        req.flash('error', 'Invalid role and/or id'), 
        res.status(404).render('error/404')
      )
    }

    profileModel.getProfile(role, id, (err, result) => {
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