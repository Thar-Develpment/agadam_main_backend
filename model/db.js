const mysql = require("mysql2");
const config = require('../config/config')

const db = mysql.createPool({
  host: config.dbInfo.host,
  user: config.dbInfo.user,
  password: config.dbInfo.password,
  database: config.dbInfo.database,
  port: config.dbInfo.port || 3306,
  multipleStatements: true
});

const query = (sql, params, callback) => {
  db.query(sql, params, (error, result) => {
    if (error) {
      console.error("DB QUERY ERROR:", error.code, error.message);
      return callback(error, null);
    }

    return callback(null, result);
  });
};

module.exports = query;