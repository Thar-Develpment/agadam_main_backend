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


exports.getBasicAssets = async (req, res) => {

    let getQuery = `SELECT * FROM am_basic_assets WHERE status = 1`;

    query(getQuery, (err, data) => {
        if (err) {
            return res.json({ status: 0, message: "Something went wrong" });
        } else if (data?.length == 0) {
            return res.json({ status: 0, message: "No data found" });
        } else {

            let imageArr = []
            let videoArr = []

            data.map(e => {
                if (e.type == 'image') {
                    imageArr.push(e.url)
                } else if (e.type == 'video') {
                    videoArr.push(e.url)
                }
            })

            return res.json({ status: 1, image: { data: imageArr, count: imageArr?.length || 0 }, video: { data: videoArr, count: videoArr?.length || 0 } });
        }
    });
};