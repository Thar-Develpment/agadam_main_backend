const express = require("express");
const router = express.Router();
const subDomain = require("../controller/sub_domain");
const { checkPayment } = require("../helper/utils");

router.post("/ask_question", subDomain.askQuestion);

router.post("/videos_details", subDomain.getVideos);

router.post("/gallery_categories", subDomain.getGalleryCategories);

router.post("/galler_details", subDomain.getGalleryDetails);

router.post("/our_stories", subDomain.getOurStories);

router.post("/site_info", checkPayment, subDomain.siteInfo)

module.exports = router;
