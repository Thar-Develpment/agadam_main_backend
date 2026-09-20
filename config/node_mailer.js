const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "aadagam7@gmail.com",
        pass: "Dabbu@777"
    }
});

 
module.exports = transporter;