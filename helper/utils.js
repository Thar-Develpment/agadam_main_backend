const query = require("../model/db")

exports.checkPayment = (req, res, next) => {

    let subdomain = req?.user?.subdomain;
    console.log("subdomain jwt: ", subdomain);

    let subDomain;

    if (req?.body?.shop_name) {
        console.log('1');
        subDomain = req?.body?.shop_name + '.aadagam.com'
    } else if (req?.body?.subdomain) {
        console.log('2');
        subDomain = req?.body?.subdomain
    } else if (subdomain) {
        console.log('3');
        subDomain = subdomain
    }

    console.log("subDomain final: ", subDomain);

    let getQuery = `SELECT id,subdomain,status,created_at,payment_at FROM am_register WHERE subdomain = ?`

    query(getQuery, [subDomain], (err, data) => {
        if (err) {
            res.json({ status: 0, message: "Something went wrong!" })
        } else if (data?.length == 0) {
            res.json({ status: 0, message: "Shop not found!" })
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
                    res.json({ status: 0, message: "Payment pending" })
                } else {
                    next()
                }
            }

        }
    })

}


function deActivateSubDomain(subDomain) {

    const query = `UPDATE am_register SET status = 0 WHERE subdomain = ?`

    query(query, [subDomain])

}