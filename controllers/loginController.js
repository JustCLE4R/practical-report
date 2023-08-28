// const loginModel = require('../models/loginModel')
//semua logikanya di atur di passport-config.js karena ... ya passport

const loginController = {
  login: (req, res) => {
    res.render('login')
  }
}

module.exports = loginController