//include module yag diperlukan
const express = require('express');
const app = express();


//set view engine ke ejs
app.set('view engine', 'ejs');

//memakai apa yang harus dipakai
app.use(express.static('public')); //biar views bisa akses folder public

//include router
const dashboardRouter = require('./routes/dashboardRoute');

//routing
app.use('/dashboard', dashboardRouter);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});