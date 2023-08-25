const con = require('../config/db');

var loginModel = {
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
      ) user
      WHERE user.username = ?
    `, [username], (err, res) => {
      if(err){
        return result(err)
      }

      if(res.length <= 0){
        return result(err)
      }
      else{
        return result(res)
      }
    })
  }
}


module.exports = loginModel;