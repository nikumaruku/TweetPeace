import nodemailer from "nodemailer";
// require('dotenv').config();

// Create a Nodemailer transporter using SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "niksyahmiirfan01@gmail.com",
    pass: "Nik.syahmi21",
  },
});

module.exports = { transporter };