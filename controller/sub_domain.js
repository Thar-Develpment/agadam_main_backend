const { Validator } = require("node-input-validator");
const query = require("../model/db");

exports.getImage = (req, res) => {
  res.json({ status: 1, data: ["img1", "img2", "img3"] });
};

exports.askQuestion = async (req, res) => {
  let reqData = req.body;

  const v = new Validator(reqData, {
    subdomain: "required|string|maxLength:30",
    customer_name: "required|string|maxLength:20",
    email: "required|email|maxLength:255",
    query: "required|maxLength:1000",
  });

  const matched = await v.check();

  if (!matched) {
    return res.status(422).json({
      success: 0,
      message: "Validation failed",
      errors: v.errors,
    });
  }

  const selectQuery = `SELECT id FROM am_register WHERE subdomain = ?`;

  query(selectQuery, [reqData.subdomain], (error, data) => {
    if (error) {
      return res.json({ status: 0, message: "Something went wrong" });
    } else if (data?.length == 0) {
      return res.json({ status: 0, message: "Invalid user" });
    } else {
      const insertQuery = `INSERT INTO am_asked_questions SET ?`;

      query(insertQuery, [reqData], (err, suc) => {
        if (err) {
          return res.json({ status: 0, message: "Something went wrong" });
        } else {
          return res.json({ status: 1, message: "Submitted Successfully" });
        }
      });
    }
  });
};

exports.getVideos = (req, res) => {
  try {
    const { subdomain } = req.body;

    if (!subdomain) {
      return res.status(400).json({
        status: 0,
        message: "Subdomain is required",
      });
    }

    let fields = "`id`, `subdomain`, `video_url`, `status`, `created_at`";
    const sql = `
      SELECT ${fields}
      FROM am_videos
      WHERE status = 1
      AND subdomain = ?
    `;

    query(sql, [subdomain], (err, results) => {
      if (err) {
        console.error("Database error:", err);

        return res.status(500).json({
          status: 0,
          message: "Database error",
        });
      } else if (results.length == 0) {
        return res.status(200).json({
          status: 0,
          message: "Database error",
        });
      }

      return res.status(200).json({
        status: 1,
        message: "Videos fetched successfully",
        data: results,
      });
    });
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      status: 0,
      message: "Internal server error",
    });
  }
};

exports.getGalleryCategories = (req, res) => {
  try {
    const { subdomain } = req.body;

    if (!subdomain) {
      return res.status(400).json({
        status: 0,
        message: "Subdomain is required",
      });
    }

    let fields = "`id`, `subdomain`, `category_name`, `status`, `created_at`";
    const sql = `
      SELECT ${fields}
      FROM am_gallery_categories
      WHERE status = 1
      AND subdomain = ?
    `;

    query(sql, [subdomain], (err, results) => {
      if (err) {
        console.error("Database error:", err);

        return res.status(500).json({
          status: 0,
          message: "Database error",
        });
      } else if (results.length == 0) {
        return res.status(200).json({
          status: 0,
          message: "No Data Found!",
        });
      }

      return res.status(200).json({
        status: 1,
        message: "Gallery_categories fetched successfully",
        data: results,
      });
    });
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      status: 0,
      message: "Internal server error",
    });
  }
};

exports.getGalleryDetails = (req, res) => {
  try {
    const { subdomain } = req.body;

    if (!subdomain) {
      return res.status(400).json({
        status: 0,
        message: "Subdomain is required",
      });
    }

    let fields =
      " `id`, `subdomain`, `category_id`, `image_url`, `status`, `created_at`";
    const sql = `
      SELECT ${fields}
      FROM am_gallery
      WHERE status = 1
      AND subdomain = ?
    `;

    query(sql, [subdomain], (err, results) => {
      if (err) {
        console.error("Database error:", err);

        return res.status(500).json({
          status: 0,
          message: "Database error",
        });
      } else if (results.length == 0) {
        return res.status(200).json({
          status: 0,
          message: "No Data Found!",
        });
      }

      return res.status(200).json({
        status: 1,
        message: "Gallery Details fetched successfully",
        data: results,
      });
    });
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      status: 0,
      message: "Internal server error",
    });
  }
};

exports.getOurStories = (req, res) => {
  try {
    const { subdomain } = req.body;

    if (!subdomain) {
      return res.status(400).json({
        status: 0,
        message: "Subdomain is required",
      });
    }

    let fields = " `id`, `subdomain`, `content`, `status`, `created_at`";
    const sql = `
      SELECT ${fields}
      FROM am_our_story
      WHERE status = 1
      AND subdomain = ?
    `;

    query(sql, [subdomain], (err, results) => {
      if (err) {
        console.error("Database error:", err);

        return res.status(500).json({
          status: 0,
          message: "Database error",
        });
      } else if (results.length == 0) {
        return res.status(200).json({
          status: 0,
          message: "No Data Found!",
        });
      }

      return res.status(200).json({
        status: 1,
        message: "Our story fetched successfully",
        data: results,
      });
    });
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      status: 0,
      message: "Internal server error",
    });
  }
};
