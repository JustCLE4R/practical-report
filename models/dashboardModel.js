const con = require('../config/db');

var dashboardModel = {
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
      SELECT id, 'aslab' role, nama, username
      FROM aslab 
      UNION
      SELECT id, 'laboran', nama, username
      FROM laboran
      UNION
      SELECT id, 'dosen', nama, username
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
  }


}

module.exports = dashboardModel;