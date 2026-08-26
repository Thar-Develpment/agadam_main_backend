const express = require("express");

const router = express.Router();

const { registerDomain } = require("../controller/auth");

router.post("/register", registerDomain);

module.exports = router;
