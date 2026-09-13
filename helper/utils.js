const query = require("../model/db")

exports.checkPayment = (subDomain) => {

    return new Promise((resolve, reject) => {

        let getQuery = `SELECT id,subdomain,status,created_at,payment_at FROM am_register WHERE subdomain = ?`

        query(getQuery, [subDomain], (err, data) => {
            if (err) {
                resolve({ status: 0, message: "Something went wrong!" })
            } else if (data?.length == 0) {
                resolve({ status: 0, message: "Subdomain not found!" })
            } else {

                let singleData = data[0]

                if (!singleData?.payment_at) {

                    const createdAt = singleData.created_at

                    const createdDate = new Date(createdAt.replace(" ", "T"));

                    const now = new Date();

                    const diffInMs = now - createdDate;

                    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

                    if (diffInDays > 2) {
                        deActivateSubDomain(subDomain)
                        resolve({ status: 0, message: "Payment pending" })
                    } else {
                        resolve({ status: 1, message: "OK" })
                    }
                }

            }
        })

    })

}


function deActivateSubDomain(subDomain) {

    const query = `UPDATE am_register SET status = 0 WHERE subdomain = ?`

    query(query, [subDomain], (err, data) => {})

}