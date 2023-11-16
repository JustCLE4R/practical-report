const con = require('../config/db');


const mahasiswaModel = {
  //mengambil mahasiswa dengan pagination
  getAllMhs: (page, limit, result) => {
    con.query(`
      SELECT * FROM (
        SELECT ROW_NUMBER() OVER (ORDER BY nama) no, nama, nim, CONCAT('20', SUBSTRING(mhs.nim, 5, 2)) stambuk
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
      SELECT mhs.nama, mhs.nim, CONCAT('20', SUBSTRING(mhs.nim, 5, 2)) stambuk, mk.nama nama_matkul, semester, kelas, dosen.nama nama_dosen, laboran.nama nama_laboran, aslab.nama nama_aslab, modul_1, modul_2, modul_3, modul_4, modul_5, modul_6, modul_7, modul_8
        FROM mahasiswa mhs 
        INNER JOIN mhs_mk_stts sts ON mhs.nim = sts.nim
        INNER JOIN mata_kuliah mk ON sts.id_mk = mk.id
        INNER JOIN dosen ON mk.id_dosen = dosen.id
        INNER JOIN laboran ON mk.id_laboran = laboran.id
        INNER JOIN aslab ON mk.id_aslab = aslab.id
        WHERE mhs.nim = ?
        ORDER BY mk.semester DESC, kelas
    `, [search], (err, rows) => {
      if(err){
        console.log(err);
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
module.exports = mahasiswaModel;