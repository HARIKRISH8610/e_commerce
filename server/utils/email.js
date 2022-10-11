const nodemailer = require("nodemailer");

const sentMail = async (data) => {
  console.log(data);

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "kamryn.feil@ethereal.email",
      pass: "3Yx4BFDZdBkrZHE1Re",
    },
  });
  await transporter.sendMail({
    from: '"Fred Foo 👻" <kamryn.feil@ethereal.email>', // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text,
  });
};

module.exports = sentMail;
