// Interfaces
import { ISendEmailProps } from "../interfaces/nodemailer.js";

// Services
import { sendEmail } from "../services/nodemailer.js";
import { otpEmailQueue } from "../services/redis.js";

export function startEmailOTPQueueProcessors(){otpEmailQueue.process("sendOtpEmail", 10, async (job) => { // Process up to 10 jobs concurrently
    console.log(`WORKER: Processing job ${job.id} - sendOtpEmail`);
    const { email, subject, html, text } = job.data as ISendEmailProps;
    try {
      const result = await sendEmail({ email, subject, html, text });
      console.log(`WORKER: Email sent for job ${job.id}.`);
      return result; // This value goes to the 'completed' event
    } catch (error) {
      console.error(`WORKER: Error sending email for job ${job.id}:`, error);
      throw error; // Important to throw so Bull knows it failed
    }
  });
  
  otpEmailQueue.on("completed", (job, result) => {
    if (job.name === "sendOtpEmail") {
      console.log(`QUEUE_EVENT: ✅ Job ${job.id} (sendOtpEmail) completed. Result:`, result);
    }
  });
  
  otpEmailQueue.on("failed", (job, err) => {
    if (job.name === "sendOtpEmail") {
      console.error(`QUEUE_EVENT: ❌ Job ${job.id} (sendOtpEmail) failed: ${err.message}. Attempts: ${job.attemptsMade}`);
    }
  });
  
  otpEmailQueue.on('error', (error) => {
      console.error('QUEUE_EVENT: Bull queue encountered an error:', error);
  });
  
  console.log("WORKER: Processor and event listeners for 'sendOtpEmail' are active.")}