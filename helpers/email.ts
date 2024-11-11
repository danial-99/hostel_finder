import nodemailer from 'nodemailer';
import postmarkTransport from 'nodemailer-postmark-transport';

// Create a transport using Postmark
const transport = nodemailer.createTransport(
  postmarkTransport({
    auth: {
      apiKey: '971be359-e1c4-44b2-bfcc-72df8e1b71f7', // Replace with your Postmark API key
    },
  })
);

/**
 * Function to send an email
 * @param from - Sender's email address
 * @param to - Recipient's email address
 * @param subject - Subject of the email
 * @param text - Plain text version of the email
 * @param html - HTML version of the email (optional)
 * @param attachments - Attachments to be sent with the email (optional)
 */
export async function sendEmail({
  from,
  to,
  subject,
  text,
  html = '',
  attachments = [],
}: {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: any[];
}) {
  const email = { from, to, subject, text, html, attachments };

  try {
    const info = await transport.sendMail(email);
    console.log('Email sent successfully:', info);
    return { status: true, message: 'Email sent successfully', info };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { status: false, message: 'Failed to send email', error };
  }
}
