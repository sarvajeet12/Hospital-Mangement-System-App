const Transporter = require('../config/mailConfig');


const sendMailToUser = async (email, title, body) => {

    let info = await Transporter.sendMail({
        from: "Hospital General Horizon",
        to: `${email}`,
        subject: `${title}`,
        html: `${body}`
    })

    // console.log("Info: ", info);

    return info;  // optional
}


module.exports = sendMailToUser;