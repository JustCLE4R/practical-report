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


// session store
const sessionStore = new MySQLStore({
  createDatabaseTable: true,
}, con);


//memakai apa yang harus dipakai
app.use(express.static('public')); //membuat views dapat mengakses folder public
app.use(express.urlencoded({ extended: true })); //untuk mengakses form
app.use(methodOverride("_method")); //override method (yang tadi cuma get & post ini jadi banyak dek)
app.use(express.json()); //parse JSON response
app.use(flash()); //notify flash
app.use(
  session({
    secret: '$2a$12$e9OjN2vB.MPtCayqmorb7ekhbOZ9.hU4KiQEnOSeV2ITi8P8inFhi',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {secure: false, httpOnly: true, maxAge: 3 * 60 * 60 * 1000}, //h m s ms, jadi 3 jam
    expires: new Date(Date.now() + 3 * 60 * 60 * 1000), // expires in 3 hours
  })
);
app.use(passport.authenticate('session')); //ya passport


//include router
const landingRouter = require('./routes/landingRouter');
const dashboardRouter = require('./routes/dashboardRouter');
const loginRouter = require('./routes/loginRouter');
const profileRouter = require('./routes/profileRouter');
const mahasiswaRouter = require('./routes/mahasiswaRouter');
const APIRouter = require('./routes/APIRouter');


//routing
app.use('/', landingRouter);
app.use('/dashboard', dashboardRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
app.use('/mahasiswa', mahasiswaRouter)
app.use('/api', APIRouter);


//404 route
app.use((req, res) => {
  res.status(404).render('error/404');
})

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});