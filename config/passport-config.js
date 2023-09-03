const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const loginModel = require('../models/loginModel');

const loginCheck = passport => {
  const authenticateUser = (username, password, done) => { //setting passport
    loginModel.getByUsername(username, async(rows) => { //mengambil user dari database
      if(rows == null){ //cek null
        return done(null, false, {message: 'Username tidak ditemukan!'});
      }
      let user = rows[0]; //inject rows[0] ke user
      try {
        if (await bcrypt.compare(password, user.password)){ //komparasi password dari login page dan database
          if(user.role == 'aslab') { //cek role = aslab
            loginModel.getAslabKelas(user.id, (err, result) => { //mengambil kelas yang di handle aslab bersangkutan
              if(err) {
                return done(null, false, {message: 'Ada Masalah saat mengambil data dari database! ' + err})
              }

              if(result == null) { //jika aslab tidak memiliki kelas sama sekali 
                return done(null, false, {message: 'Nampaknya anda adalah Asisten Laboratorium, dan ada masalah saat mengambil data kelas anda!'})
              }
              else { //data aslab
                user.kelas = result
                return done(null, user);
              }
            });
          }
          else { //data selain dari aslab
            return done(null, user);
          }
        }
        else {
          return done(null, false, { message: 'Password Salah!' });
        }
      }
      catch (error) {
        return done(error);
      }
    })
  };

  passport.use(new localStrategy({}, authenticateUser)); //memakau local strategy

  //serializing untuk menentukan data apa saja yang ingin disimpan
  passport.serializeUser((user, done) => {
    if(user.role == 'aslab') { //data untuk aslab
      done(null, {id: user.id, role: user.role, nama: user.nama, username: user.username, kelas: user.kelas});
    }
    else{ //data selain aslab (laboran dan dosen)
      done(null, {id: user.id, role: user.role, nama: user.nama, username: user.username});
    }
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