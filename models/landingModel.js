const con = require('../config/db');

const landingModel = {
  getAllAdmin: (result) => {
    con.query(`
    SELECT * FROM (
      SELECT nama, 'laboran' role, motto
      FROM laboran
      UNION
      SELECT nama, 'aslab', motto
      FROM aslab
    ) u
    `, (err, rows) => {
      if (err) {
        console.log(err)
        return result(err, null)
      }
      else {
        return result(null, rows)
      }
    })
  },








}
module.exports = landingModel;