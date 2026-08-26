const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "arun",
  password: "Arun@123",
  database: "Test",
});

const query = (sql, params, callback) => {
  db.execute(sql, params, (error, result) => {
    if (error) {
      return callback(error, null);
    }

    return callback(null, result);
  });
};

module.exports = query;