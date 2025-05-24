// Node Mailer
import nodemailer from "nodemailer";

// Interfaces
import { ISendEmailProps } from "../interfaces";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: process.env.NODE_MAILER_HOST,
  port: process.env.NODE_MAILER_PORT || 465,
  secure: true, // true for 465, false for other ports
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
      from: `"Maddison Foo Koch" <${process.env.NODE_MAILER_USER_EMAIL}>`,
      to: email,
      subject: subject,
      text: text,
      html: html,
    });
  } catch (error) {
    console.error("An error occured while sending the email", error);
  }
}
