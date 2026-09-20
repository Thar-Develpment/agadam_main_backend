const express = require("express");
const router = express.Router();
const subDomain = require("../controller/sub_domain");
const { checkPayment } = require("../helper/utils");

router.post("/ask_question", checkPayment, subDomain.askQuestion);

router.post("/videos_details", checkPayment, subDomain.getVideos);

router.post("/gallery_categories", checkPayment, subDomain.getGalleryCategories);

router.post("/galler_details", checkPayment, subDomain.getGalleryDetails);

router.post("/our_stories", checkPayment, subDomain.getOurStories);

router.post("/site_info", checkPayment, subDomain.siteInfo)

module.exports = router;
