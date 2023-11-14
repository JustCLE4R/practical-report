const con = require('../config/db');


const kelasModel = {
  getAllKelas: (result) => {
    con.query(`
      SELECT mk.id, mk.nama, mk.semester, mk.semester, mk.kelas, dosen.nama nama_dosen, laboran.nama nama_laboran, aslab.nama nama_aslab
      FROM mata_kuliah mk
      INNER JOIN dosen ON mk.id_dosen = dosen.id
      INNER JOIN laboran ON mk.id_laboran = laboran.id
      INNER JOIN aslab ON mk.id_aslab = aslab.id
      ORDER BY mk.semester
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
    })
  },
  


  getKelasById: (id, result) => {
    con.query(`
      SELECT mhs.nama nama, mhs.nim, stts.modul_1, stts.modul_2, stts.modul_3, stts.modul_4, stts.modul_5, stts.modul_6, stts.modul_7, stts.modul_8
      FROM mhs_mk_stts stts
      INNER JOIN mahasiswa mhs ON stts.nim = mhs.nim
      WHERE stts.id_mk = ?
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




}

module.exports = kelasModel