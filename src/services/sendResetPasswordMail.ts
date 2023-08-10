import { EMAIL, PASSWORD } from "../__CONSTANTS__";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

export default async (email: string, token: string) => {
  const emailHtml = `
<html ⚡4email>
  <head>
    <meta charset="utf-8">
    <style amp4email-boilerplate>body{visibility:hidden}</style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
  </head>
  <body>
    <h1>Reset Password</h1>
    <p>Here is your reset password token:</p>
    <p><strong>${token}</strong></p>
    <p>To reset your password, please click the following link:</p>
    <p><a href="http://example.com/reset-password?token=${token}">Reset Password</a></p>
    <p>If you did not request a password reset, please ignore this email.</p>
  </body>
</html>`;

  const mailOptions = {
    from: "your-gmail-email@gmail.com",
    to: email,
    subject: "Testing Gmail SMTP",
    text: token,
    html: emailHtml
  };

  await transporter.sendMail(
    mailOptions,
    (error: Error | null, info: nodemailer.SentMessageInfo) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    }
  );
};
