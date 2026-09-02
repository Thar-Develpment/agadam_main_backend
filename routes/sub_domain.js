const express = require("express");
const router = express.Router();
const subDomain = require("../controller/sub_domain");

router.get("/get_image", subDomain.getImage);

router.post("/ask_question", subDomain.askQuestion);

router.post("/videos_details", subDomain.getVideos);

router.post("/gallery_categories", subDomain.getGalleryCategories);

router.post("/galler_details", subDomain.getGalleryDetails);

router.post("/our_stories", subDomain.getOurStories);

router.get("/site_info",subDomain.siteInfo)

module.exports = router;
