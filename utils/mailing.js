import { createTransport } from "nodemailer";
import "dotenv/config";

export const mailTransporter = createTransport({
  // host: "smtp.gmail.com",
  // port: 587,
  // secure: false,
  service: 'Gmail',
  auth: {
    user: process.env.USER_GMAIL,
    pass: process.env.GMAIL_PASS_KEY,
  },
});

// Dynamically generate email message 
export const emailMessage = `
<div>
<h1> Dear {{lastName}},</h1>
<p>A new account has been created for you!</p>
<h2>Thank you</h2>
</div>
`;
