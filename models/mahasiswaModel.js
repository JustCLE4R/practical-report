const con = require('../config/db');

const mahasiswaModel = {
  //mengambil semua mahasiswa
  getAllMhs: (page, result) => {
    let limit = 20 //setting limit per page
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






}
module.exports = mahasiswaModel;