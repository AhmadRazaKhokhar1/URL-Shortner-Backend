// Interfaces
import { ISendEmailProps } from "../interfaces/nodemailer.js";

// Services
import { sendEmail } from "../services/nodemailer.js";
import { otpEmailQueue } from "../services/redis.js";

export function startEmailOTPQueueProcessors() {
  otpEmailQueue.process("sendOtpEmail", 10, async (job) => {
    const { email, subject, html, text } = job.data as ISendEmailProps;
    try {
      const result = await sendEmail({ email, subject, html, text });
      return result; // This value goes to the 'completed' event
    } catch (error) {
      console.error(
        `WORKER Error while sending email for job ${job.id}:`,
        error,
      );
      throw error; // Important to throw so Bull knows it failed
    }
  });

  otpEmailQueue.on("completed", (job, result) => {
    if (job.name === "sendOtpEmail") {
      console.log(` ✅ Job ${job.id} completed. Result:`, result);
    }
  });

  otpEmailQueue.on("failed", (job, err) => {
    if (job.name === "sendOtpEmail") {
      console.error(
        `❌ Job ${job.id} failed: ${err.message}. Attempts: ${job.attemptsMade}`,
      );
    }
  });

  otpEmailQueue.on("error", (error) => {
    console.error("An error occured in bull queue:", error);
  });
}
