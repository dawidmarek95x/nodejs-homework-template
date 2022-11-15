const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, PORT } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const createMsg = (email, verificationToken, name) => {
  return {
    to: email,
    from: "davi95x@gmail.com",
    subject: "Contacts App - Verification Email",
    html: `<div>
    <h1>Email Confirmation</h1>
    <h2>Hello ${name},</h2>
    <p>Thank you for signing up for the Contacts app. To activate your account, please click on the link below.</p>
    <a href="http://localhost:${PORT}/api/users/verify/${verificationToken}">Click here</a>
    </div>`,
  };
};

const sendEmail =  (email, verificationToken, name) => {
  sgMail
    .send(createMsg(email, verificationToken, name))
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = sendEmail;
