const mysql = require("mysql2");
const config = require('../config/config')

const db = mysql.createPool({
  // host: "localhost",
  // user: "u823453650_aadagam_user",
  // password: "hVSIeFgniyOmMhyrziqxO>vqKrXY0",
  // database: "u823453650_aadagam",
  // port: "3306",

  host: "tokaido.proxy.rlwy.net",
  user: "root",
  password: "hVSIeFgniyOmMhyrziqxOiLcozsEnVQo",
  database: "railway",
  port: "55914",
  multipleStatements: true,
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