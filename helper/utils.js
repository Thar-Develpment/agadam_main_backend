const query = require("../model/db")

exports.checkPayment = (req, res, next) => {

    let subdomain = req?.user?.subdomain;

    let subDomain;

    if (req?.body?.shop_name) {
        subDomain = req?.body?.shop_name + '.aadagam.com'
    } else if (req?.body?.subdomain) {
        subDomain = req?.body?.subdomain
    } else if (subdomain) {
        subDomain = subdomain
    }

    let getQuery = `SELECT id,subdomain,status,created_at,payment_at FROM am_register WHERE subdomain = ? AND status = ?`

    console.log("subDomain 77777: ", subDomain);
    query(getQuery, [subDomain, 1], (err, data) => {
        if (err) {
            return res.json({ status: 0, message: "Something went wrong!" })
        } else if (data?.length == 0) {
            return res.json({ status: 2, message: "Shop not found!" })
        } else {

            let singleData = data[0]
            console.log("singleData: ", singleData);

            console.log("!singleData?.payment_at: ", !singleData?.payment_at);
            if (!singleData?.payment_at) {

                const createdAt = singleData?.created_at?.toString()

                console.log("created_at RAW:", singleData?.created_at);
                console.log("created_at TYPE:", typeof singleData?.created_at);

                const createdDate = new Date(createdAt?.replace(" ", "T"));
                console.log("createdDate: ", createdDate);

                const now = new Date();

                const diffInMs = now.getTime() - createdDate.getTime();

                const diffInHours = diffInMs / (1000 * 60 * 60);
                console.log("diffInHours: ", diffInHours);
                const diffInDays = diffInHours / 24;
                console.log("diffInDays: ", diffInDays);

                if (diffInDays > 2) {
                    deActivateSubDomain(subDomain)
                    return res.json({ status: 3, message: "Payment pending" })
                } else {
                    next()
                }
            } else {
                next()
            }

        }
    })

}


function deActivateSubDomain(subDomain) {

    const query = `UPDATE am_register SET status = 0 WHERE subdomain = ?`

    query(query, [subDomain], () => { })

}