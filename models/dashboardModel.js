const con = require('../config/db');

const dashboardModel = {
  //mengambil seluruh jumlah mahasiswa, aslab, laboran, dosen
  getAmount: (result) => {
    con.query(`
      SELECT * FROM (
        SELECT 'Mahasiswa' role, COUNT(nim) jumlah
        FROM mahasiswa
        UNION
        SELECT 'Aslab', COUNT(id)
        FROM aslab
        UNION
        SELECT 'Laboran', COUNT(id)
        FROM laboran
        UNION
        SELECT 'Dosen', COUNT(id)
        FROM dosen
      ) jumlah
    `, (err, rows) => {
      if (err){ 
        return result(err, null)
      }
      else {
        return result(null, rows)
      }
    })
  },

  //mengambil seluruh data admin
  getAllAdmin: (result) => {
    con.query(`
      SELECT * FROM (
        SELECT id, 'Asisten Laboratorium' role, nama, username
        FROM aslab 
        UNION
        SELECT id, 'Laboran', nama, username
        FROM laboran
        UNION
        SELECT id, 'Dosen', nama, username
        FROM dosen
      ) admin
    `, (err, rows) => {
      if (err) {
        return result(err, null)
      }
      else {
        return result(null, rows)
      }
    })
  },

  //mengambil data mahasiswa berdasarkan role admin
  getMhsByNimRole: (nim, role, id, result) => {
    con.query(`
      SELECT mhs.*, mk.nama nama_matkul, semester, kelas, dosen.nama nama_dosen, laboran.nama nama_laboran, aslab.nama nama_aslab, sts.id id_status, modul_1, modul_2, modul_3, modul_4, modul_5, modul_6, modul_7, modul_8
      FROM mahasiswa mhs 
      INNER JOIN mhs_mk_stts sts ON mhs.nim = sts.nim
      INNER JOIN mata_kuliah mk ON sts.id_mk = mk.id
      INNER JOIN dosen ON mk.id_dosen = dosen.id
      INNER JOIN laboran ON mk.id_laboran = laboran.id
      INNER JOIN aslab ON mk.id_aslab = aslab.id
      WHERE mhs.nim = ?
      AND ${role}.id = ${id}
      ORDER BY semester DESC
    `, [nim], (err, rows) => {
      if(err){
        return result(err, null)
      }

      if(rows.length <= 0){
        return result(err, null)
      }
      else{
        return result(null, rows)
      }
    })
  },

  //mengedit status modul mahasiswa
  updateMhsSts: (id_sts, updatedStatus, result) => {
    con.query(`
      UPDATE mhs_mk_stts
      SET ?
      WHERE id = ?
    `, [updatedStatus, id_sts], (err, rows) => {
      if(err){
        return result(err, null)
      }
      else{
        return result(null, rows)
      }
    })
  },




}
module.exports = dashboardModel;