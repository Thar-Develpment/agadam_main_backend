const mysql = require("mysql2");
const config = require('../config/config')

const db = mysql.createPool({
  host: "mysql.railway.internal",
  user: "root",
  password: "hVSIeFgniyOmMhyrziqxOiLcozsEnVQo",
  database: "railway",
  multipleStatements: true
});

const query = (sql, params, callback) => {
  db.query(sql, params, (error, result) => {
    if (error) {
      return callback(error, null);
    }

    return callback(null, result);
  });
};

module.exports = query;