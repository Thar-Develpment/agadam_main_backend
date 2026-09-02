const express = require("express");

const price_cron = require("../controller/price_cron");

const router = express.Router();

const { registerDomain } = require("../controller/auth");

router.post("/register", registerDomain);

module.exports = router;
