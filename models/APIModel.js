const con = require('../config/db');

const APIModel = {
  // mengambil semua mahasiswa
  getMahasiswa: (result) => {
    con.query(`
      SELECT nim, nama, CONCAT('20', SUBSTRING(nim, 5, 2)) stambuk
      FROM mahasiswa;
    `, (err, rows) => {
      if (err) {
        console.log(err)
        return result(err, null)
      }
      else{
        return result(null, rows)
      }
    }
  )},

  // mengambil status laporan praktikum mahasiswa berdasarkan nim
  getMhsStatus: (nim, result) => {
    con.query(`
      SELECT mhs.nama, mhs.nim, CONCAT('20', SUBSTRING(mhs.nim, 5, 2)) stambuk, mk.nama nama_matkul, semester, kelas, dosen.nama nama_dosen, laboran.nama nama_laboran, aslab.nama nama_aslab, modul_1, modul_2, modul_3, modul_4, modul_5, modul_6, modul_7, modul_8
      FROM mahasiswa mhs 
      INNER JOIN mhs_mk_stts sts ON mhs.nim = sts.nim
      INNER JOIN mata_kuliah mk ON sts.id_mk = mk.id
      INNER JOIN dosen ON mk.id_dosen = dosen.id
      INNER JOIN laboran ON mk.id_laboran = laboran.id
      INNER JOIN aslab ON mk.id_aslab = aslab.id
      WHERE mhs.nim = ?
      ORDER BY mk.semester DESC
    `, [nim], (err, rows) => {
      if (err) {
        console.log(err)
        return result(err, null)
      }
  
      if (rows.length <= 0){
        console.log('Database Kosong (getMhsStatus)')
        return result(err, null)
      }
      else{
        return result(null, rows)
      }
    }
  )},

  // mengambil selueurh asisten lab
  getAsistenLab: (result) => {
    con.query(`
      SELECT nama, nim, notel, motto, instagram, facebook
      FROM aslab;
    `, (err, rows) => {
      if (err) {
        console.log(err)
        return result(err, null)
      }

      if (rows.length <= 0){
        console.log('Database Kosong (getAsistenLab)')
        return result(err, null)
      }
      else{
        return result(null, rows)
      }
    }
  )},

  // mengambil semua laboran 
  getLaboran: (result) => {
      con.query(`
        SELECT nama, nim, notel, motto, instagram, facebook
        FROM laboran;
      `, (err, rows) => {
        if (err) {
          console.log(err)
          return result(err, null)
        }
  
        if (rows.length <= 0){
          console.log('Database Kosong (getLaboran)')
          return result(err, null)
        }
        else{
          return result(null, rows)
        }
      }
  )},

  // mengambil seluruh dosen
  getDosen: (result) => {
    con.query(`
      SELECT nama, notel, motto, instagram, facebook
      FROM dosen;
    `, (err, rows) => {
      if (err) {
        console.log(err)
        return result(err, null)
      }
  
      if (rows.length <= 0){
        console.log('Database Kosong (getDosen)')
        return result(err, null)
      }
      else{
        return result(null, rows)
      }
    }
  )},







}
module.exports = APIModel;