const dashboardModel = require('../models/dashboardModel');
const bcrypt = require('bcrypt');


const dashboardController = {
  logout: (req, res) => { //logout user
    req.logout((err) => {
      if(err){return next(err)}
      res.redirect('/login')
    });
  },

  getDashboard: (req, res) => { //mengambil seluruh data yang diperlukan untuk dashboard
    let amounts
    dashboardModel.getAmount((err, result) => { //mengambil jumlah yang berada di bagian data
      if(err){
        req.flash('error','Ada masalah saat mengambil database (getAmount) ' + err)
        res.render('dashboard')
      }
      else{
        amounts = result
      }
    })
    dashboardModel.getAllAdmin((err, result) =>{ //mengambil seluruh admin (aslab, laboran, dosen)
      if(err){
        req.flash('error','Ada masalah saat mengambil database (getAllAdmin) ' + err)
        res.render('dashboard')
      }
      else{
        res.render('dashboard', {amount: amounts, result: result, admin: req.user})
      }
    })
  },

  getDataMhs: (req, res) => { //fungsi search di dahsboard
    let nim = req.body.nim, //menangkap nim dari form searc
        role = req.user.role, //mengambil nilai role dari req.user (role masing-masing)
        id = req.user.id //mengambil nilai id dari req.user (id masing-masing)

    dashboardModel.getMhsByNimRole(nim, role, id, (err, result) => { //mengambil seluruh data dari mahasiswa mulai dari nama, mata_kuliah yang diambil, modul, aslab, laboran, dosen, dll
      if(err){
        req.flash('error','Ada masalah saat mengambil database (getMhsByNimRole) ' + err)
        res.redirect('/dashboard')
      }
      else if(result == null && req.user.role == 'laboran'){ //cek result null dan role laboran
        req.flash('error','Mahasiswa dengan nim <strong>'+ nim +'</strong> tidak ditemukan atau belum ada di <b>Kelas</b> yang seharusnya.')
        res.redirect('/dashboard')
      }
      else if(result == null && req.user.role == 'aslab'){ //cek result null dan role aslab
        dashboardModel.getMhsByNim(nim, (err, result) => { //mengambil mahasiswa dari database dengan nim
          if(err){
            req.flash('error','Ada masalah saat mengambil database (getMhsByNim) ' + err)
            res.redirect('/dashboard')
          }
          else if(result == null){ //cek result null
            req.flash('error','Mahasiswa dengan nim <strong>'+ nim +'</strong> tidak ditemukan di database.')
            res.redirect('/dashboard')
          }
          else{ //jika data ada
            res.render('dashboard/edit', {datas: result, admin: req.user})
          }
        })
      }
      else{ //jika data ada
        res.render('dashboard/edit', {datas: result, admin: req.user})
      }
    })
  },

  editMhsSts: (req, res) => { //fungsi edit modul mahasiswa
    let updatedStatus = { //mengambil nilai dari form yang diisi oleh admin (aslab atau laboran)
          modul_1 : req.body.modul_1,
          modul_2 : req.body.modul_2,
          modul_3 : req.body.modul_3,
          modul_4 : req.body.modul_4,
          modul_5 : req.body.modul_5,
          modul_6 : req.body.modul_6,
          modul_7 : req.body.modul_7,
          modul_8 : req.body.modul_8
    },
        id_sts = req.body.id_status //megambil id status dari hidden form (mhs_mk_stts) untuk di edit

    dashboardModel.updateMhsSts(id_sts, updatedStatus, (err, result) => { //update ke database
      if (err) {
        req.flash('error', 'Ada masalah saat mengubah data (updateMhsSts) ' + err);
      } else {
        req.flash('success', 'Berhasil mengubah data');
      }
      res.redirect('/dashboard');
    });
  },

  getMhsToSts: (req, res) => { //menampilkan data mahasiswa untuk di tambahkan ke kelas aslab 
    let nim = req.params.nim //mengambil NIM mahasiswa dari URL(params)

    if (req.user.role == 'laboran') { //cek jika laboran maka tidak bisa akses
      req.flash('error', 'Minta asisten lab memasukan mahasiswa bersangkutan ke kelasnya')
      res.redirect('/dashboard')
    }

    dashboardModel.getMhsByNim(nim, (err, result) => { //mengambil data mahasiswa dengan NIM
      if(err){
        req.flash('error', 'Ada masalah saat mengambil database (getMhsByNim) ' + err)
        res.redirect('/dashboard')
      }
      else if(result == null){ //cek null
        req.flash('error', 'Mahasiswa dengan nim <strong>'+ nim +'</strong> tidak ditemukan di database.')
        res.redirect('/dashboard')
      }
      else{
        dashboardModel.getMkMhs(nim, (err, result2) => { //mengambil kelas apa saja yang sudah diambil mahasiswa
          if(err){
            req.flash('error', 'Ada masalah saat mengambil database (getMkMhs) '+ err)
            res.redirect('/dashboard')
          }
          else{
            result[0].kelas = result2 //inject data dari result2 ke result yang berisi matakuliah yang sudah diambil mahasiswa
            res.render('dashboard/add', {datas: result[0], admin: req.user})
          }
        })
      }
    });
  },

  addMhsToSts: (req, res) => { //fungsi menambahkan mata kuliah dan status ke mahasiswa
    let insertData = {
          nim : req.params.nim, //ambil NIM dari URL(params)
          id_mk : req.body.kelas //ambil kelas dari form 
    };

    dashboardModel.addMhsToSts(insertData, (err, result) => { //memasukan data ke database
      if (err) {
        req.flash('error', 'Ada masalah saat menambahkan data (addMhsToSts) '+ err);
      } else {
        req.flash('success', 'Berhasil menambahkan mata kuliah ke mahasiswa');
      }
      res.redirect('/dashboard');
    });
  },

  deleteMhsFromSts: (req, res) => {
    let sts_id = req.body.id

    dashboardModel.deleteMhsFromSts(sts_id, (err, result) => {
      if (err) {
        req.flash('error', 'Ada masalah saat menghapus kelas (deleteMhsFromSts) '+ err);
      } else {
        req.flash('success', 'Berhasil menghapus kelas');
      }
      res.redirect('/dashboard');
    })
  },

  getChangePassword: (req, res) => {
    res.render('dashboard/changePassword')
  },

  changePassword: async (req, res) => {
    try {
      const password_lama = req.body.passwordLama;
      const password_baru = req.body.passwordBaru1;
      let password_db;
  
      // Ambil password dari database
      const result = await new Promise((resolve, reject) => {
        dashboardModel.getPasswordByIdRole(req.user.role, req.user.id, (err, result) => {
          if (err) {
            req.flash('error', 'Ada masalah saat mengambil password lama anda ' + err);
            reject(err);
          }
  
          if (result === null) { // Check null
            req.flash('error', 'Return Null ' + err);
            reject('Return Null');
          } else {
            resolve(result[0].password);
          }
        });
      });
  
      password_db = result;
  
      // Compare password lama dengan password di database
      if (bcrypt.compareSync(password_lama, password_db)) {
        // hashing password baru
        const hashedPasswordBaru = {
          password: bcrypt.hashSync(password_baru, 10)
        };

        // masukan password baru ke database
        dashboardModel.changePasswordByIdRole(req.user.role, req.user.id, hashedPasswordBaru, (err, result) => {
          if(err){
            console.log(err)
            req.flash('error', 'Masalah saat ingin memasukan password baru ke database')
          }
          else{
            req.flash('success', 'Berhasil mengubah password')
          }
          res.redirect('/dashboard')
        })
      } else {
        req.flash('error', 'Password lama salah');
        res.redirect('/dashboard');
      }
  
    } catch (error) {
      console.log(error);
      throw error;
    }
  },














}
module.exports = dashboardController;