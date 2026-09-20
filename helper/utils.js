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

    let getQuery = `SELECT id,subdomain,status,created_at,payment_at FROM am_register WHERE subdomain = ?`

    query(getQuery, [subDomain], (err, data) => {
        if (err) {
            return res.json({ status: 0, message: "Something went wrong!" })
        } else if (data?.length == 0) {
            return res.json({ status: 0, message: "Shop not found!" })
        } else {

            let singleData = data[0]

            if (!singleData?.payment_at) {

                const createdAt = singleData?.created_at?.toString()

                const createdDate = new Date(createdAt?.replace(" ", "T"));

                const now = new Date();

                const diffInMs = now - createdDate;

                const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

                if (diffInDays > 2) {
                    deActivateSubDomain(subDomain)
                    return res.json({ status: 0, message: "Payment pending" })
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

    query(query, [subDomain])

}