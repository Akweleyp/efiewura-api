import { createTransport } from "nodemailer";
import "dotenv/config";

export const mailTransporter = createTransport({
  host: "smtp.gmail.com",
  host: 587,
  secure: false,
  auth: {
    user: process.env.USER_GMAIL,
    pass: process.env.GMAIL_PASS_KEY,
  },
});

export const emailMessage = `
<div>
<h1> Dear {{lastname}}</h1>
<p>A new account has been created for you!</p>
<h2>Thank you<h2>
</div>
`;
