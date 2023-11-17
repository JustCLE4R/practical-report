//include module yang diperlukan
const express = require('express');
const passport = require('passport');
const methodOverride = require('method-override');
const flash = require('express-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session)
const con = require('./config/db')
const app = express();


const { loginCheck } = require('./config/passport-config');
loginCheck(passport)


//set view engine ke ejs
app.set('view engine', 'ejs');


// set proxy trust
app.set('trust proxy', 1);


// session store
const sessionStore = new MySQLStore({
  createDatabaseTable: true,
  clearExpired: true,
  expiration: 3 * 60 * 60 * 1000,
  checkExpirationInterval: 1.5 * 60 * 60 * 1000,
}, con);


//memakai apa yang harus dipakai
app.use(express.static('public')); //membuat views dapat mengakses folder public
app.use(express.urlencoded({ extended: true })); //untuk mengakses form
app.use(methodOverride("_method")); //override method (yang tadi cuma get & post ini jadi banyak dek)
app.use(express.json()); //parse JSON response
app.use(flash()); //notify flash
app.use(
  session({
    secret: process.env.SECRET || 'very secret key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: false, 
      httpOnly: true, 
      maxAge: 3 * 60 * 60 * 1000,
      sameSite: 'Strict'
    },
  })
);
app.use(passport.authenticate('session')); //ya passport


//include router
const APIRouter = require('./routes/APIRouter');
const landingRouter = require('./routes/landingRouter');
const loginRouter = require('./routes/loginRouter');
const dashboardRouter = require('./routes/dashboardRouter');
const profileRouter = require('./routes/profileRouter');
const mahasiswaRouter = require('./routes/mahasiswaRouter');
const kelasRouter = require('./routes/kelasRouter');


//routing
app.use('/api', APIRouter);
app.use('/', landingRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/profile', profileRouter);
app.use('/mahasiswa', mahasiswaRouter)
app.use('/kelas', kelasRouter)


//404 route
app.use((req, res) => {
  res.status(404).render('error/404');
})

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});