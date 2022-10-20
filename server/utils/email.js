const nodemailer = require("nodemailer");
const fs = require("fs");
const { promisify } = require("util");
const path = require("path");
const express = require("express");

const sentMail = async (data) => {
  console.log(data);
  // const readfile = promisify(fs.readFile);
  // const readfile = express.static(
  //   path.join(__dirname, "/server/utils/contract_created/contract_created.html")
  // );
  const createStream = fs.readFileSync(
    "utils/contract_created/contract_created.html"
  );
  console.log(createStream);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "harikrishnapons@gmail.com",
      pass: "fipdigafjxfjzzht",
    },
  });
  //data.to
  const mailed = await transporter.sendMail({
    from: '"Fred Foo 👻" <kamryn.feil@ethereal.email>', // sender address
    to: "harikrishna.vcet@gmail.com", // list of receivers
    subject: data.subject, // Subject line
    text: data.text,
    attachments: [
      {
        filename: "logo.jpg",
        path: `utils/contract_created/logo.png`,
        cid: "logo1", //same cid value as in the html img src
      },
    ],
    html: createStream,
  });
  console.log(mailed);
};

module.exports = sentMail;
