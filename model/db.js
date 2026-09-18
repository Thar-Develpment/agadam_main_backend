const mysql = require("mysql2");
const config = require('../config/config')

const db = mysql.createPool({
  host: "localhost",
  user: "u823453650_aadagam_user",
  password: "7K=Jv0XR@>*xhVSIeFgniyOmMhyrziqxO",
  database: "u823453650_aadagam_db",
  port: "3306",
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