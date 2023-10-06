import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "niksyahmiirfan01@gmail.com",
    pass: "Nik.syahmi21",
  },
});

export const sendEmail = async (recipientEmail, subject, message) => {
  try {
    const info = await transporter.sendMail({
      from: 'niksyahmiirfan01@gmail.com', // Sender's email address
      to: recipientEmail, // Recipient's email address
      subject: subject, // Email subject
      text: message, // Plain text message
    });

    console.log('Email sent: ', info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

module.exports = {transporter}