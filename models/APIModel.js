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
      ORDER BY mk.semester DESC, mk.kelas
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

  // Mengambil seluruh data kelas
  getAllKelas: (result) => {
    con.query(`
      SELECT mk.id, mk.nama, mk.semester, mk.kelas, dosen.nama nama_dosen, laboran.nama nama_laboran, aslab.nama nama_aslab
      FROM mata_kuliah mk
      INNER JOIN dosen ON mk.id_dosen = dosen.id
      INNER JOIN laboran ON mk.id_laboran = laboran.id
      INNER JOIN aslab ON mk.id_aslab = aslab.id
      ORDER BY mk.semester, mk.nama, mk.kelas
    `, (err, rows) => {
      if(err){
        console.log(err);
        return result(err, null);
      }

      if(rows.length <= 0){
        console.log('Database Kosong (getAllKelas)');
        return result(err, null);
      }
      else{
        return result(null, rows);
      }
    }
  )},

  // Mengambil seluruh data mhs yang di kelas
  getKelasById: (id, result) => {
    con.query(`
      SELECT mhs.nama nama, mhs.nim, stts.modul_1, stts.modul_2, stts.modul_3, stts.modul_4, stts.modul_5, stts.modul_6, stts.modul_7, stts.modul_8
      FROM mhs_mk_stts stts
      INNER JOIN mahasiswa mhs ON stts.nim = mhs.nim
      WHERE stts.id_mk = ?
      ORDER BY mhs.nama
    `, [id], (err, rows) => {
      if(err){
        console.log(err);
        return result(err, null);
      }

      if(rows.length <= 0){
        console.log('Database Kosong (getKelasById)');
        return result(err, null);
      }
      else{
        return result(null, rows);
      }
    })
  },

  // mengambil detail kelas
  getKelasDetailById: (id, result) => {
    con.query(`
      SELECT mk.nama nama_matkul, semester, kelas, dosen.nama nama_dosen, laboran.nama nama_laboran, aslab.nama nama_aslab
      FROM mata_kuliah mk
      INNER JOIN dosen ON mk.id_dosen = dosen.id
      INNER JOIN laboran ON mk.id_laboran = laboran.id
      INNER JOIN aslab ON mk.id_aslab = aslab.id
      WHERE mk.id = ?
    `, [id], (err, rows) => {
      if(err){
        console.log(err);
        return result(err, null);
      }

      if(rows.length <= 0){
        console.log('Database Kosong (getKelasDetailById)');
        return result(err, null);
      }
      else{
        return result(null, rows);
      }
    })
  },








}
module.exports = APIModel;