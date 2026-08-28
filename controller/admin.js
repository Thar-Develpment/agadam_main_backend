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