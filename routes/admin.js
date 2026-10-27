const express = require('express')
const router = express.Router()
const admin = require('../controller/admin')
const { authenticateToken } = require('../helper/jwt')
const multer = require("multer");
const image = require('../controller/image_upload')
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
    files: 10,
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

    // if (allowed.includes(file.mimetype)) {
    cb(null, true);
    // } else {
    //   cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed"), false);
    // }
  },
});
// const {upload } = require('../helper/upload')
const { uploadImages } = require("../controller/image_contoller");
const { checkPayment } = require('../helper/utils');


router.post('/login', admin.login)

router.post('/add_category', authenticateToken, checkPayment, admin.addCategory)
router.post('/get_all_category', authenticateToken, admin.getAllCategory)
router.post('/get_single_category', authenticateToken, admin.getSingleCategory)
router.post('/update_category', authenticateToken, checkPayment, admin.updateCategory)


router.post('/add_gallery', authenticateToken, checkPayment, admin.addGallery)
router.post('/get_all_gallery', authenticateToken, admin.getAllGallery)
router.post('/get_single_gallery', authenticateToken, admin.getSingleGallery)
router.post('/update_gallery', authenticateToken, checkPayment, admin.updateGallery)


router.post('/add_video', authenticateToken, checkPayment, admin.addVideo)
router.post('/get_all_video', authenticateToken, admin.getAllVideo)
router.post('/get_single_video', authenticateToken, admin.getSingleVideo)
router.post('/update_video', authenticateToken, checkPayment, admin.updateVideo)


router.post('/get_all_asked_questions', authenticateToken, admin.getAllAskedQuestions)
router.post('/get_single_asked_questions', authenticateToken, admin.getSingleAskedQuestion)
router.post('/update_asked_questions', authenticateToken, checkPayment, admin.updateAskedQuestion)


router.post('/add_our_story', authenticateToken, checkPayment, admin.addOurStory)
router.post('/get_all_our_story', authenticateToken, admin.getAllOurStory)
router.post('/get_single_our_story', authenticateToken, admin.getSingleOurStory)
router.post('/update_our_story', authenticateToken, checkPayment, admin.updateOurStory)


router.post('/add_hero_slide', authenticateToken, checkPayment, admin.addHeroSlide)
router.post('/get_all_hero_slide', authenticateToken, admin.getAllHeroSlide)
router.post('/get_single_hero_slide', authenticateToken, admin.getSingleHeroSlide)
router.post('/update_hero_slide', authenticateToken, checkPayment, admin.updateHeroSlide)


router.post('/add_basic_asset', authenticateToken, admin.addBasicAsset)
router.post('/get_all_basic_asset', authenticateToken, admin.getAllBasicAsset)
router.post('/get_single_basic_asset', authenticateToken, admin.getSingleBasicAsset)
router.post('/update_basic_asset', authenticateToken, admin.updateBasicAsset)


router.get('/dash_board', authenticateToken, checkPayment, admin.adminDashboard)
router.post('/price_update', authenticateToken, admin.priceUpdateApi)

router.post('/get_all_tenants', admin.getAllTenants)
router.post('/toggle_tenant_status', admin.toggleTenantStatus)

router.post(
  "/upload", authenticateToken, checkPayment,
  upload.array("images", 10),
  uploadImages
);

router.post('/update_site_info', authenticateToken, checkPayment, admin.updateSiteInfo)
router.post('/activate_subdomain', authenticateToken, admin.activateSubdomain)

router.post("/send_otp", admin.sendOtp);
router.post("/reset_password", admin.resetPassword);
router.post("/resend_otp", admin.resendOtp);


module.exports = router;