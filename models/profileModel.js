const con = require('../config/db');

const profileModel ={
  //mengambil profile admin berdasarkan role dan id
  getProfile: (role, id, result) => {
    con.query(`
      SELECT * FROM (
        SELECT id, 'aslab' role, nama, nim nim, notel, motto, instagram, facebook, email, hobi, panggilan
        FROM aslab 
        UNION
        SELECT id, 'laboran', nama, nim, notel, motto, instagram, facebook, email, hobi, panggilan
        FROM laboran
        UNION
        SELECT id, 'dosen', nama, nip, notel, motto, instagram, facebook, email, hobi, panggilan
        FROM dosen
      ) u
      WHERE u.role = ?
      AND u.id = ?
    `, [role, id], (err, rows) => {
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

  getAllProfile: (result) => {
    con.query(`
      SELECT u.id, u.role, u.nama, u.notel, u.instagram, u.facebook, u.mhs_count, u.mk_count
      FROM (
        SELECT aslab.id, 'aslab' role, aslab.nama, aslab.notel, aslab.instagram, aslab.facebook,
              (SELECT COUNT(DISTINCT stts.nim)
                FROM mhs_mk_stts stts
                INNER JOIN mata_kuliah mk ON stts.id_mk = mk.id
                WHERE mk.id_aslab = aslab.id
              ) AS mhs_count,
              (SELECT COUNT(DISTINCT mk.id)
                FROM mata_kuliah mk
                WHERE mk.id_aslab = aslab.id
              ) AS mk_count
        FROM aslab
        UNION
        SELECT laboran.id, 'laboran', laboran.nama, laboran.notel, laboran.instagram, laboran.facebook,
              (SELECT COUNT(DISTINCT stts.nim)
                FROM mhs_mk_stts stts
                INNER JOIN mata_kuliah mk ON stts.id_mk = mk.id
                WHERE mk.id_laboran = laboran.id
              ) AS mhs_count,
              (SELECT COUNT(DISTINCT mk.id)
                FROM mata_kuliah mk
                WHERE mk.id_laboran = laboran.id
              ) AS mk_count
        FROM laboran
        UNION
        SELECT dosen.id, 'dosen', dosen.nama, dosen.notel, dosen.instagram, dosen.facebook,
              (SELECT COUNT(DISTINCT stts.nim)
                FROM mhs_mk_stts stts
                INNER JOIN mata_kuliah mk ON stts.id_mk = mk.id
                WHERE mk.id_dosen = dosen.id
              ) AS mhs_count,
              (SELECT COUNT(DISTINCT mk.id)
                FROM mata_kuliah mk
                WHERE mk.id_dosen = dosen.id
              ) AS mk_count
        FROM dosen
      ) AS u;    
    `, (err, rows) => {
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

  getKelasByIdRole: (id, role, result) => {
    con.query(`
      SELECT mk.id, mk.nama, mk.semester, mk.kelas
      FROM mata_kuliah mk
      WHERE mk.id_${role} = ?
    `, [id], (err, rows) => {
      if(err){
        console.log(err)
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

  getMhsCountByIdRole: (id, role, result) => {
    con.query(`
      SELECT COUNT(DISTINCT stts.nim)
      FROM mhs_mk_stts stts
      INNER JOIN mata_kuliah mk ON stts.id_mk = mk.id
      INNER JOIN ${role} ON mk.id_${role} = ${role}.id
      WHERE ${role}.id = ?
    `, [id], (err, rows) => {
      if(err){
        console.log(err)
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






}
module.exports = profileModel;