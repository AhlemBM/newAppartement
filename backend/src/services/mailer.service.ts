import nodemailer from 'nodemailer';

export const mailerService = async (to, subject, message) => {
  const hostname = process.env.SMTP_HOST;
  const username = process.env.SMTP_USERNAME;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_SENDER;
  const port = process.env.SMTP_PORT,
    transporter = nodemailer.createTransport({
      host: hostname,
      port: port,
      secure: false,
      //requireTLS: true,
      tls: { rejectUnauthorized: false },
      auth: {
        user: username,
        pass: password,
      },
    });
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `QR Work <${from}>`,
    to: to,
    subject: subject,
    html: message,
  });
};
