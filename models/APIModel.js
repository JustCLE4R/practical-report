const con = require('../config/db');

const APIModel = {
  // mengambil semua mahasiswa
  getMahasiswa: (result) => {
    con.query(`
      SELECT nim, nama, CONCAT('20', SUBSTRING(nim, 5, 2)) AS stambuk
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
  getMhsStatus: (result) => {
    con.query(`
      SELECT 
      FROM   WHERE = ''
    `, (err, rows) => {
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