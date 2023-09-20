const con = require('../config/db');

const profileModel ={
  //mengambil profile admin berdasarkan role dan id
  getProfile: (role, id, result) => {
    con.query(`
      SELECT * FROM (
        SELECT id, 'aslab' role, nama, nim nim, notel, motto, instagram, facebook
        FROM aslab 
        UNION
        SELECT id, 'laboran', nama, nim, notel, motto, instagram, facebook
        FROM laboran
        UNION
        SELECT id, 'dosen', nama, nip, notel, motto, instagram, facebook
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
      SELECT * FROM (
        SELECT id, 'aslab' role, nama, notel, instagram
        FROM aslab 
        UNION
        SELECT id, 'laboran', nama, notel, instagram
        FROM laboran
        UNION
        SELECT id, 'dosen', nama, notel, instagram
        FROM dosen
      ) u
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






}
module.exports = profileModel;