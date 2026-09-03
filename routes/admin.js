const express = require('express')
const router = express.Router()
const admin = require('../controller/admin')
const { authenticateToken } = require('../helper/jwt')


router.post('/login', admin.login)

router.post('/add_category', authenticateToken, admin.addCategory)
router.post('/get_all_category', authenticateToken, admin.getAllCategory)
router.post('/get_single_category', authenticateToken, admin.getSingleCategory)
router.post('/update_category', authenticateToken, admin.updateCategory)


router.post('/add_gallery', authenticateToken, admin.addGallery)
router.post('/get_all_gallery', authenticateToken, admin.getAllGallery)
router.post('/get_single_gallery', authenticateToken, admin.getSingleGallery)
router.post('/update_gallery', authenticateToken, admin.updateGallery)


router.post('/add_video', authenticateToken, admin.addVideo)
router.post('/get_all_video', authenticateToken, admin.getAllVideo)
router.post('/get_single_video', authenticateToken, admin.getSingleVideo)
router.post('/update_video', authenticateToken, admin.updateVideo)


router.post('/get_all_asked_questions', authenticateToken, admin.getAllAskedQuestions)
router.post('/get_single_asked_questions', authenticateToken, admin.getSingleAskedQuestion)
router.post('/update_asked_questions', authenticateToken, admin.updateAskedQuestion)


router.post('/add_our_story', authenticateToken, admin.addOurStory)
router.post('/get_all_our_story', authenticateToken, admin.getAllOurStory)
router.post('/get_single_our_story', authenticateToken, admin.getSingleOurStory)
router.post('/update_our_story', authenticateToken, admin.updateOurStory)

router.get('/dash_board',authenticateToken,admin.adminDashboard)
router.get('/price_update',authenticateToken,admin.priceUpdateApi)


module.exports = router