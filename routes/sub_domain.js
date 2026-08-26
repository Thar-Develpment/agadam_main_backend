const express = require('express')
const router = express.Router()
const subDomain = require('../controller/sub_domain')


router.get('/get_image', subDomain.getImage)


module.exports = router