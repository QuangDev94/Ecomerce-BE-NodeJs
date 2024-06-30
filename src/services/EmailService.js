const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendEmailCreateOrder = async (email, orderItems) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  let listItem = "";
  orderItems.forEach((order) => {
    listItem += `<b>${order.name}</b><br></br>`;
  });
  const info = await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT, // sender address
    to: email, // list of receivers
    subject: "You have ordered success at QuangDev-Shop", // Subject line
    text: "Ordered Success", // plain text body
    html: `<b>You have ordered success : </b><br></br>${listItem}`, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

module.exports = {
  sendEmailCreateOrder,
};
