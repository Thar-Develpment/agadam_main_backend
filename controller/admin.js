const { Validator } = require("node-input-validator");
const query = require("../model/db");

exports.addCategory = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { category_name } = reqData

    const v = new Validator(reqData, {
        category_name: "required|string|maxLength:30"
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    let insertQuery = `INSERT INTO am_gallery_categories SET ?`

    let payload = {
        subdomain,
        category_name
    }

    query(insertQuery, payload, (err, data) => {
        if (err) {
            const isDuplicate = err.code == 'ER_DUP_ENTRY';
            const errMsg = isDuplicate ? `Category ${category_name} already exists` : "Failed to add category"
            return res.json({ status: 0, message: errMsg })
        } else {
            return res.json({ status: 1, message: "Category added successfully" })
        }
    })

}

exports.getAllCategory = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { pageNo, pageSize } = reqData

    const v = new Validator(reqData, {
        pageNo: "required|numeric",
        pageSize: "required|numeric",
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    const offset = pageNo * pageSize;

    const countQuery = `SELECT COUNT(id) AS totalRecords FROM am_gallery_categories WHERE subdomain = ?;`

    const getQuery = `SELECT * FROM am_gallery_categories WHERE subdomain = ? ORDER BY id DESC LIMIT ? OFFSET ?`

    const finalQuery = countQuery + getQuery

    query(finalQuery, [subdomain, subdomain, pageSize, offset], (err, data) => {
        if (err) {
            return res.json({ status: 0, message: "Something went wrong" })
        } else if (data[0][0]?.totalRecords == 0) {
            return res.json({ status: 0, message: "No data found" })
        } else {
            const totalCount = data[0][0]?.totalRecords || 0
            return res.json({ status: 1, totalRecords: totalCount, data: data[1] })
        }
    })

}

exports.getSingleCategory = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { id } = reqData

    const v = new Validator(reqData, {
        id: "required|numeric"
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    let getQuery = `SELECT * FROM am_gallery_categories WHERE id = ? AND subdomain = ?`

    query(getQuery, [id, subdomain], (err, data) => {
        if (err) {
            return res.json({ status: 0, message: "Something went wrong" })
        } else if (data?.length == 0) {
            return res.json({ status: 0, message: "No data found" })
        } else {
            return res.json({ status: 1, data: data[0] })
        }
    })

}

exports.updateCategory = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { id, category_name, status } = reqData

    const v = new Validator(reqData, {
        id: "required|numeric",
        category_name: "required|string|maxLength:30",
        status: "required|in:0,1"
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    let insertQuery = `UPDATE am_gallery_categories SET ? WHERE id = ? AND subdomain = ?`

    let payload = {
        category_name,
        status
    }

    query(insertQuery, [payload, id, subdomain], (err, data) => {
        if (err) {
            const isDuplicate = err.code == 'ER_DUP_ENTRY';
            const errMsg = isDuplicate ? `Category ${category_name} already exists` : "Failed to update category"
            return res.json({ status: 0, message: errMsg })
        } else {
            return res.json({ status: 1, message: "Category updated successfully" })
        }
    })

}



exports.addGallery = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { category_id, image_url } = reqData

    const v = new Validator(reqData, {
        category_id: "required|numeric",
        image_url: "required|string|maxLength:100"
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    let insertQuery = `INSERT INTO am_gallery SET ?`

    let payload = {
        subdomain,
        category_id,
        image_url
    }

    query(insertQuery, payload, (err, data) => {
        if (err) {
            const isDuplicate = err.code == 'ER_DUP_ENTRY';
            const errMsg = isDuplicate ? `Gallery already exists` : "Failed to add Gallery"
            return res.json({ status: 0, message: errMsg })
        } else {
            return res.json({ status: 1, message: "Gallery added successfully" })
        }
    })

}

exports.getAllGallery = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { pageNo, pageSize } = reqData

    const v = new Validator(reqData, {
        pageNo: "required|numeric",
        pageSize: "required|numeric",
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    const offset = pageNo * pageSize;

    const countQuery = `SELECT COUNT(id) AS totalRecords FROM am_gallery WHERE subdomain = ?;`

    const getQuery = `SELECT * FROM am_gallery WHERE subdomain = ? ORDER BY id DESC LIMIT ? OFFSET ?`

    const finalQuery = countQuery + getQuery

    query(finalQuery, [subdomain, subdomain, pageSize, offset], (err, data) => {
        if (err) {
            return res.json({ status: 0, message: "Something went wrong" })
        } else if (data[0][0]?.totalRecords == 0) {
            return res.json({ status: 0, message: "No data found" })
        } else {
            const totalCount = data[0][0]?.totalRecords || 0
            return res.json({ status: 1, totalRecords: totalCount, data: data[1] })
        }
    })

}

exports.getSingleGallery = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { id } = reqData

    const v = new Validator(reqData, {
        id: "required|numeric"
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    let getQuery = `SELECT * FROM am_gallery WHERE id = ? AND subdomain = ?`

    query(getQuery, [id, subdomain], (err, data) => {
        if (err) {
            return res.json({ status: 0, message: "Something went wrong" })
        } else if (data?.length == 0) {
            return res.json({ status: 0, message: "No data found" })
        } else {
            return res.json({ status: 1, data: data[0] })
        }
    })

}

exports.updateGallery = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { id, category_id, image_url, status } = reqData

    const v = new Validator(reqData, {
        id: "required|numeric",
        category_id: "required|numeric",
        image_url: "required|string|maxLength:30",
        status: "required|in:0,1"
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    let insertQuery = `UPDATE am_gallery SET ? WHERE id = ? AND subdomain = ?`

    let payload = {
        category_id,
        image_url,
        category_name,
        status
    }

    query(insertQuery, [payload, id, subdomain], (err, data) => {
        if (err) {
            const isDuplicate = err.code == 'ER_DUP_ENTRY';
            const errMsg = isDuplicate ? `Gallery already exists` : "Failed to update Gallery"
            return res.json({ status: 0, message: errMsg })
        } else {
            return res.json({ status: 1, message: "Gallery updated successfully" })
        }
    })

}



exports.addVideo = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { video_url } = reqData

    const v = new Validator(reqData, {
        video_url: "required|string|maxLength:100"
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    let insertQuery = `INSERT INTO am_videos SET ?`

    let payload = {
        subdomain,
        video_url
    }

    query(insertQuery, payload, (err, data) => {
        if (err) {
            const isDuplicate = err.code == 'ER_DUP_ENTRY';
            const errMsg = isDuplicate ? `Video already exists` : "Failed to add Video"
            return res.json({ status: 0, message: errMsg })
        } else {
            return res.json({ status: 1, message: "Video added successfully" })
        }
    })

}

exports.getAllVideo = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { pageNo, pageSize } = reqData

    const v = new Validator(reqData, {
        pageNo: "required|numeric",
        pageSize: "required|numeric",
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    const offset = pageNo * pageSize;

    const countQuery = `SELECT COUNT(id) AS totalRecords FROM am_videos WHERE subdomain = ?;`

    const getQuery = `SELECT * FROM am_videos WHERE subdomain = ? ORDER BY id DESC LIMIT ? OFFSET ?`

    const finalQuery = countQuery + getQuery

    query(finalQuery, [subdomain, subdomain, pageSize, offset], (err, data) => {
        if (err) {
            return res.json({ status: 0, message: "Something went wrong" })
        } else if (data[0][0]?.totalRecords == 0) {
            return res.json({ status: 0, message: "No data found" })
        } else {
            const totalCount = data[0][0]?.totalRecords || 0
            return res.json({ status: 1, totalRecords: totalCount, data: data[1] })
        }
    })

}

exports.getSingleVideo = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { id } = reqData

    const v = new Validator(reqData, {
        id: "required|numeric"
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    let getQuery = `SELECT * FROM am_videos WHERE id = ? AND subdomain = ?`

    query(getQuery, [id, subdomain], (err, data) => {
        if (err) {
            return res.json({ status: 0, message: "Something went wrong" })
        } else if (data?.length == 0) {
            return res.json({ status: 0, message: "No data found" })
        } else {
            return res.json({ status: 1, data: data[0] })
        }
    })

}

exports.updateGallery = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { id, video_url, status } = reqData

    const v = new Validator(reqData, {
        id: "required|numeric",
        video_url: "required|string|maxLength:30",
        status: "required|in:0,1"
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    let insertQuery = `UPDATE am_videos SET ? WHERE id = ? AND subdomain = ?`

    let payload = {
        video_url,
        status
    }

    query(insertQuery, [payload, id, subdomain], (err, data) => {
        if (err) {
            const isDuplicate = err.code == 'ER_DUP_ENTRY';
            const errMsg = isDuplicate ? `Video already exists` : "Failed to update Video"
            return res.json({ status: 0, message: errMsg })
        } else {
            return res.json({ status: 1, message: "Video updated successfully" })
        }
    })

}



exports.getAllAskedQuestions = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { pageNo, pageSize } = reqData

    const v = new Validator(reqData, {
        pageNo: "required|numeric",
        pageSize: "required|numeric",
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    let where = 'WHERE subdomain = ?'

    const values = [subdomain]

    if (reqData?.status) {
        where += ' AND status = ?'
        values.push(reqData.status)
    }

    const finalValues = [...values, ...values]

    const offset = pageNo * pageSize;

    const countQuery = `SELECT COUNT(id) AS totalRecords FROM am_asked_questions ${where};`

    const getQuery = `SELECT * FROM am_asked_questions ${where} ORDER BY id DESC LIMIT ? OFFSET ?`

    const finalQuery = countQuery + getQuery

    query(finalQuery, [...finalValues, pageSize, offset], (err, data) => {
        if (err) {
            return res.json({ status: 0, message: "Something went wrong" })
        } else if (data[0][0]?.totalRecords == 0) {
            return res.json({ status: 0, message: "No data found" })
        } else {
            const totalCount = data[0][0]?.totalRecords || 0
            return res.json({ status: 1, totalRecords: totalCount, data: data[1] })
        }
    })

}

exports.getSingleAskedQuestion = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { id } = reqData

    const v = new Validator(reqData, {
        id: "required|numeric"
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    let getQuery = `SELECT * FROM am_asked_questions WHERE id = ? AND subdomain = ?`

    query(getQuery, [id, subdomain], (err, data) => {
        if (err) {
            return res.json({ status: 0, message: "Something went wrong" })
        } else if (data?.length == 0) {
            return res.json({ status: 0, message: "No data found" })
        } else {
            return res.json({ status: 1, data: data[0] })
        }
    })

}

exports.updateAskedQuestion = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { id, status } = reqData

    const v = new Validator(reqData, {
        id: "required|numeric",
        status: "required|in:0,1"
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    let insertQuery = `UPDATE am_asked_questions SET ? WHERE id = ? AND subdomain = ?`

    let payload = {
        status
    }

    query(insertQuery, [payload, id, subdomain], (err, data) => {
        if (err) {
            return res.json({ status: 0, message: "Failed to update status" })
        } else {
            return res.json({ status: 1, message: "Status updated successfully" })
        }
    })

}




exports.addOurStory = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { content } = reqData

    const v = new Validator(reqData, {
        content: "required|string"
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    let insertQuery = `INSERT INTO am_our_story SET ?`

    let strContent = JSON.stringify(content)

    let payload = {
        subdomain,
        strContent
    }

    query(insertQuery, payload, (err, data) => {
        if (err) {
            const isDuplicate = err.code == 'ER_DUP_ENTRY';
            const errMsg = isDuplicate ? `Story already exists` : "Failed to add Story"
            return res.json({ status: 0, message: errMsg })
        } else {
            return res.json({ status: 1, message: "Story added successfully" })
        }
    })

}

exports.getAllOurStory = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { pageNo, pageSize } = reqData

    const v = new Validator(reqData, {
        pageNo: "required|numeric",
        pageSize: "required|numeric",
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    const offset = pageNo * pageSize;

    const countQuery = `SELECT COUNT(id) AS totalRecords FROM am_our_story WHERE subdomain = ?;`

    const getQuery = `SELECT * FROM am_our_story WHERE subdomain = ? ORDER BY id DESC LIMIT ? OFFSET ?`

    const finalQuery = countQuery + getQuery

    query(finalQuery, [subdomain, subdomain, pageSize, offset], (err, data) => {
        if (err) {
            return res.json({ status: 0, message: "Something went wrong" })
        } else if (data[0][0]?.totalRecords == 0) {
            return res.json({ status: 0, message: "No data found" })
        } else {
            const totalCount = data[0][0]?.totalRecords || 0
            const listData = data[1].map(e => {
                e.content = JSON.parse(e.content)
                return e
            })
            return res.json({ status: 1, totalRecords: totalCount, data: listData })
        }
    })

}

exports.getSingleOurStory = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { id } = reqData

    const v = new Validator(reqData, {
        id: "required|numeric"
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    let getQuery = `SELECT * FROM am_our_story WHERE id = ? AND subdomain = ?`

    query(getQuery, [id, subdomain], (err, data) => {
        if (err) {
            return res.json({ status: 0, message: "Something went wrong" })
        } else if (data?.length == 0) {
            return res.json({ status: 0, message: "No data found" })
        } else {
            data[0].content = JSON.parse(data[0].content)
            return res.json({ status: 1, data: data[0] })
        }
    })

}

exports.updateOurStory = async (req, res) => {

    let reqData = req.body;

    const { subdomain } = req.user

    const { id, content } = reqData

    const v = new Validator(reqData, {
        id: "required|numeric",
        content: "required|string"
    });

    const matched = await v.check();

    if (!matched) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: v.errors,
        });
    }

    let insertQuery = `UPDATE am_our_story SET ? WHERE id = ? AND subdomain = ?`

    const strContent = JSON.stringify(content)

    let payload = {
        strContent
    }

    query(insertQuery, [payload, id, subdomain], (err, data) => {
        if (err) {
            return res.json({ status: 0, message: "Failed to update story" })
        } else {
            return res.json({ status: 1, message: "Story updated successfully" })
        }
    })

}