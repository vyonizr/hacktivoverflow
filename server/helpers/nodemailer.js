require('dotenv').config()

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAILPASSWORD,
  }
});

function sendMail(to, text) {
  let mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: 'HacktivOverflow: Your questions stats',
    text
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);

    } else {
      console.log(info.response);

    }
  })
}

module.exports = sendMail