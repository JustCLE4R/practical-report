const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const loginModel = require('../models/loginModel');

const loginCheck = passport => {
  const authenticateUser = (username, password, done) => {
    loginModel.getByUsername(username, async(rows) => {
      if(rows == null){
        return done(null, false, {
          message: 'Username tidak ditemukan!'
      });
      }
      let user = rows[0];
      try {
        if (await bcrypt.compare(password, user.password)){
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password Salah!' });
        }
      } catch (error) {
        return done(error);
      }
    })
  };

  passport.use(new localStrategy({}, authenticateUser));

  //serializing untuk menentukan data apa saja yang ingin disimpan
  passport.serializeUser((user, done) => {
    done(null, {id: user.id, role: user.role, nama: user.nama, username: user.username});
  });

  //deserilizing
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  //check if user is authenticated
  passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/login');
  };

  //check if user is not authenticated
  passport.notAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/dashboard');
  };

  //to set user for the views
  passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
  }
}

module.exports = { loginCheck, };