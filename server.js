//include module yag diperlukan
const express = require('express');
const app = express();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');


const { loginCheck } = require('./config/passport-config');
loginCheck(passport)


//set view engine ke ejs
app.set('view engine', 'ejs');


//memakai apa yang harus dipakai
app.use(express.static('public')); //membuat views dapat mengakses folder public
app.use(express.urlencoded({ extended: true })); //untuk mengakses form
app.use(express.json()); //parse JSON response
app.use(flash()); //notify flash
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, maxAge: 12 * 60 * 60 * 1000}, //h m s ms, jadi 12 jam
  })
);
app.use(passport.authenticate('session')); //ya passport


//include router
const dashboardRouter = require('./routes/dashboardRouter');
const loginRouter = require('./routes/loginRouter');
const profileRouter = require('./routes/profileRouter');


//routing
app.use('/dashboard', dashboardRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);

//404 route
app.use((req, res) => {
  res.status(404).render('error/404');
})


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});