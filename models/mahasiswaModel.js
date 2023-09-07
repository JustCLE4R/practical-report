const con = require('../config/db');


const mahasiswaModel = {
  //mengambil mahasiswa dengan pagination
  getAllMhs: (page, limit, result) => {
    con.query(`
      SELECT * FROM (
        SELECT ROW_NUMBER() OVER (ORDER BY nama) no, nama, nim, stambuk
        FROM mahasiswa mhs
      ) tbl
      WHERE no BETWEEN ((? - 1) * ${limit}) + 1 AND (? * ${limit})
    `, [page, page], (err, rows) => {
      if(err){
        console.log(err);
        return result(err, null);
      }
      else{
        return result(null, rows);
      }
    })
  },

  getMhsByNim: (search, result) => {
    con.query(`
    SELECT ROW_NUMBER() OVER (ORDER BY nama) no, mahasiswa.* 
    FROM mahasiswa
    WHERE nama LIKE ? OR
    nim LIKE ?
    `, [`%${search}%`, `%${search}%`], (err, rows) => {
      if(err){
        console.log(err);
        return result(err, null);
      }
      else{
        return result(null, rows);
      }
    })
  }






}
module.exports = mahasiswaModel;