const express = require('express')
const router = express.Router()
const basic = require('../controller/basic')

router.get('/get_basic_info', basic.getBasicInfo)

router.get('/get_basic_assets', basic.getBasicAssets)

module.exports = router;
