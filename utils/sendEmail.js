const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text, html = null) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"LojaTec" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,  // fallback para clientes de e-mail que não suportam HTML
    html,  // corpo em HTML
  });
}

module.exports = sendEmail;
