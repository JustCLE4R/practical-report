const con = require('../config/db');

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
  }
}


module.exports = loginModel;