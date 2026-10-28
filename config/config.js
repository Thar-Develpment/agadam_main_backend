let ENV = process.env.NODE_ENV || "local";
if (ENV === "prod") ENV = "production";

module.exports = require(`./${ENV}.js`);