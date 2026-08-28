const express = require('express')
const router = express.Router()
const admin = require('../controller/admin')
const { authenticateToken } = require('../helper/jwt')


router.post('/add_category', authenticateToken, admin.addCategory)
router.post('/get_all_category', authenticateToken, admin.getAllCategory)
router.post('/get_single_category', authenticateToken, admin.getSingleCategory)
router.post('/update_category', authenticateToken, admin.updateCategory)


module.exports = router