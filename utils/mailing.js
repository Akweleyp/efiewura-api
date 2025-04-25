import { createTransport } from "nodemailer";
import "dotenv/config";

export const mailTransporter = createTransport({
  host: "smtp.gmail.com",
  // port: 587,
  // secure: false,
  // service: 'gmail',
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_GMAIL,
    pass: process.env.GMAIL_PASS_KEY,
  },
});
console.log("sending mail")

// Dynamically generate email message 
export const emailMessage = `
<div>
<h1> Dear {{lastName}},</h1>
<p>Welcome to Efiewura your trusted source for finding the perfect home</p>
<p>By creating an account, you've unlocked a range of powerful tools designed to simplify your search:</p>
<p>Extensive Listings: Discover a wide variety of housing options, tailored to your preferences.</p>
<p>Personalized Experience: Save your favorite listings, set up custom alerts, and track your search progress</p>
<p>Direct Connections: Connect directly with property owners, streamlining the application process.</p>
<p>We're committed to making your housing search as smooth and efficient as possible. If you need any support, please don't hesitate to reach out to us at efiewurahousing@gmail.com.</p>
<p>Best regards</p>
<h2>The Efiewura Team</h2>
</div>
`;
