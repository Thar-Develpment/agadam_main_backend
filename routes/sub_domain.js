const express = require('express')
const router = express.Router()
const subDomain = require('../controller/sub_domain')


router.get('/get_image', subDomain.getImage)

router.post('/ask_question', subDomain.askQuestion)


module.exports = router