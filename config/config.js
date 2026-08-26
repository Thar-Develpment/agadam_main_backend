const ENV = process.env.NODE_ENV || "local";

module.exports = require(`./${ENV}.js`);