// Node Mailer
import nodemailer from "nodemailer";

// Interfaces
import { ISendEmailProps } from "../interfaces/nodemailer.js";

// Dotenv
import { configDotenv } from "dotenv";
configDotenv()

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: process.env.NODE_MAILER_SERVICE,
  auth: {
    user: process.env.NODE_MAILER_USER_EMAIL,
    pass: process.env.NODE_MAILER_USER_PASS,
  },
});

// Sender Functions
export async function sendEmail({
  email,
  subject,
  text,
  html,
}: ISendEmailProps) {
  try {
    await transporter.sendMail({
      from: `"URL Shortner - Ahmad Raza Khokhar" <${process.env.NODE_MAILER_USER_EMAIL}>`,
      to: email,
      subject: subject,
      text: text,
      html: html,
    });
    console.log("sent email successfully");
  } catch (error) {
    console.error("An error occured while sending the email", error);
  }
}
