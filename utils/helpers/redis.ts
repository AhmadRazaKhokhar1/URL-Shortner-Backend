// Interfaces
import { ISendEmailProps } from "../interfaces/nodemailer.js";

// Services
import { otpEmailQueue } from "../services/redis.js";

export async function AddToSendOtpEmailQueue({
  email = "ahmadrazayousaf19@gmail.com", // Default values are fine here
  html = "<p>Hi from queue</p>",
  subject = "testing",
  text = "testing text",
}: ISendEmailProps) {
  try {
    const job = await otpEmailQueue.add(
      "sendOtpEmail", 
      {
        
        text,
        email,
        subject,
        html,
      },
      { delay: 500, attempts: 3, removeOnComplete: true }, 
    );
    return job; 
  } catch (error) {

    throw error; 
  }
}
