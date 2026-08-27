const { Validator } = require("node-input-validator");
const query = require("../model/db")

exports.getImage = (req, res) => {

    res.json({ status: 1, data: ['img1', 'img2', 'img3'] })

}

exports.askQuestion = async (req, res) => {

    let reqData = req.body

      const v = new Validator(reqData, {
      subdomain: "required|string|maxLength:30",
      customer_name: "required|string|maxLength:20",
      email: "required|email|maxLength:255",
      query: "required|maxLength:1000"
    });

    const matched = await v.check();

    if (!matched) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: v.errors,
      });
    }

    const selectQuery = `SELECT id FROM am_register WHERE subdomain = ?`

    query(selectQuery, [reqData.subdomain], (error, data) => {
        if (error) {
            return res.json({ status: 0, message: "Something went wrong" })
        } else if (data?.length == 0) {
            return res.json({ status: 0, message: "Invalid user" })
        } else {

            const insertQuery = `INSERT INTO am_asked_questions SET ?`

            query(insertQuery, [reqData], (err, suc) => {
                if (err) {
                    return res.json({ status: 0, message: "Something went wrong" })
                } else {
                    return res.json({ status: 1, message: "Submitted Successfully" })
                }
            })
        }
    })

}