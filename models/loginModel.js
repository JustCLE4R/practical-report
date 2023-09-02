const con = require('../config/db');

//mengambil data admin dengan username
const loginModel = {
  getByUsername: (username, result) => {
    con.query(`
      SELECT * FROM (
        SELECT id, 'aslab' role, nama, username, password
        FROM aslab
        UNION
        SELECT id, 'laboran', nama, username, password
        FROM laboran
        UNION
        SELECT id, 'dosen', nama, username, password
        FROM dosen
      ) u
      WHERE u.username = ?
    `, [username], (err, rows) => {
      if(err){
        return result(err)
      }

      if(rows.length <= 0){
        return result(err)
      }
      else{
        return result(rows)
      }
    })
  },

//mengambil data kelas admin (khusus aslab)
  getAslabKelas: (id, result) => {
    con.query(`
      SELECT mk.id, mk.nama, mk.semester, mk.kelas
      FROM mata_kuliah mk
      INNER JOIN aslab ON mk.id_aslab = aslab.id
      WHERE aslab.id = ?
      ORDER BY mk.id ASC
    `, [id], (err, rows) => {
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
  }






}
module.exports = loginModel;