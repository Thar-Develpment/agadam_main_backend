const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "aadagam7@gmail.com",
        pass: "ciwcttgpvajqdkck"
    }
});

 
module.exports = transporter;