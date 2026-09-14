const query = require("../model/db");

exports.getBasicInfo = async (req, res) => {

    let getQuery = `SELECT * FROM am_basic_info WHERE id = ?`;

    query(getQuery, [1], (err, data) => {
        console.log("err: ", err);
        if (err) {
            return res.json({ status: 0, message: "Something went wrong" });
        } else if (data?.length == 0) {
            return res.json({ status: 0, message: "No data found" });
        } else {
            delete data[0].password
            return res.json({ status: 1, data: data[0] });
        }
    });
};