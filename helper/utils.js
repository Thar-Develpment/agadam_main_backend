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
            return res.json({ status: 2, message: "Shop not found!" })
        } else {

            let singleData = data[0]

            if (!singleData?.payment_at) {

                const createdDate = singleData?.created_at;

                const now = new Date();

                const diffInMs = now.getTime() - createdDate.getTime();

                // 48 hours
                const TWO_DAYS_IN_MS = 48 * 60 * 60 * 1000;

                if (diffInMs >= TWO_DAYS_IN_MS) {
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

    const getQuery = `UPDATE am_register SET status = 0 WHERE subdomain = ?`

    query(getQuery, [subDomain], () => { })

}