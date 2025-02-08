'use server';
import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';

// Create reusable transporter with better configuration
const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587, // Using TLS port instead of SSL
  secure: false, // Use TLS
  auth: {
    user: 'uisrar293@gmail.com',
    pass: 'xrpx vezr mand ashs',
  },
  tls: {
    rejectUnauthorized: true, // Verify SSL certificates
    minVersion: 'TLSv1.2', // Use modern TLS version
  },
  pool: true, // Use pooled connections
  maxConnections: 5, // Maximum number of simultaneous connections
  maxMessages: 100, // Maximum number of messages per connection
  rateDelta: 1000, // How many milliseconds between messages
  rateLimit: 5, // Maximum number of messages per rateDelta
});

// Verify transporter connection on startup
transporter.verify((error) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

// Helper function to create email options
const createMailOptions = (to: string, subject: string, text: string, html: string): SendMailOptions => ({
  from: {
    name: 'Hostel Management',
    address: 'uisrar293@gmail.com'
  },
  to,
  subject,
  text,
  html,
  headers: {
    'X-Priority': '1', // High priority
    'X-MSMail-Priority': 'High',
    'Importance': 'high'
  }
});

// Base email sending function with retries
const sendEmailWithRetry = async (mailOptions: SendMailOptions, retries = 3): Promise<void> => {
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying email send. Attempts remaining: ${retries - 1}`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
      return sendEmailWithRetry(mailOptions, retries - 1);
    }
    throw error;
  }
};

// Email sending functions with improved error handling
export const sendRejectionEmail = async (email: string | undefined): Promise<void> => {
  if (!email) {
    console.log('No email provided for rejection email');
    return;
  }

  const mailOptions = createMailOptions(
    email,
    'Hostel Booking Request Rejected',
    'Dear Hostel Owner, \n\nYour hostel booking request has been rejected. Please contact support for more details.\n\nBest regards, \nTeam Hostel Management',
    '<p>Dear Hostel Owner,</p><p>Your hostel booking request has been <strong>rejected</strong>. Please contact support for more details.</p><p>Best regards,<br>Team Hostel Management</p>'
  );

  await sendEmailWithRetry(mailOptions);
};

export const sendApprovalEmail = async (email: string | undefined): Promise<void> => {
  if (!email) {
    console.log('No email provided for approval email');
    return;
  }

  const mailOptions = createMailOptions(
    email,
    'Hostel Booking Request Approved',
    'Dear Hostel Owner, \n\nYour hostel booking request has been approved. Congratulations! If you have any questions, please contact support.\n\nBest regards, \nTeam Hostel Management',
    '<p>Dear Hostel Owner,</p><p>Your hostel booking request has been <strong>approved</strong>. Congratulations! If you have any questions, please contact support.</p><p>Best regards,<br>Team Hostel Management</p>'
  );

  await sendEmailWithRetry(mailOptions);
};

export const sendBookingApprovalEmail = async (email: string | undefined): Promise<void> => {
  if (!email) {
    console.log('No email provided for booking approval');
    return;
  }

  const mailOptions = createMailOptions(
    email,
    'Booking Request Approved',
    'Dear User, \n\nYour booking request has been approved. Thank you for choosing our service. If you have any questions, feel free to contact us.\n\nBest regards, \nTeam Hostel Management',
    '<p>Dear User,</p><p>Your booking request has been <strong>approved</strong>. Thank you for choosing our service.</p><p>Best regards,<br>Team Hostel Management</p>'
  );

  await sendEmailWithRetry(mailOptions);
};

export const sendBookingRejectionEmail = async (email: string | undefined): Promise<void> => {
  if (!email) {
    console.log('No email provided for booking rejection');
    return;
  }

  const mailOptions = createMailOptions(
    email,
    'Booking Request Rejected',
    'Dear User, \n\nWe regret to inform you that your booking request has been rejected. Please contact support for further assistance.\n\nBest regards, \nTeam Hostel Management',
    '<p>Dear User,</p><p>We regret to inform you that your booking request has been <strong>rejected</strong>. Please contact support for further assistance.</p><p>Best regards,<br>Team Hostel Management</p>'
  );

  await sendEmailWithRetry(mailOptions);
};

export const sendBookingStatusEmail = async (email: string | undefined, status: string | undefined): Promise<void> => {
  if (!email || !status) {
    console.log('Missing email or status for booking status update');
    return;
  }

  const mailOptions = createMailOptions(
    email,
    'Booking Status Update',
    `Dear User, \n\nYour booking request status has been updated to ${status}. Please contact support for further assistance.\n\nBest regards, \nTeam Hostel Management`,
    `<p>Dear User,</p><p>Your booking request status has been updated to <strong>${status}</strong>. Please contact support for further assistance.</p><p>Best regards,<br>Team Hostel Management</p>`
  );

  await sendEmailWithRetry(mailOptions);
};

export const sendBookingRequestEmail = async (email: string | undefined): Promise<string> => {
  if (!email) {
    return "Invalid owner email";
  }

  const mailOptions = createMailOptions(
    email,
    'New Booking Request',
    'Dear Hostel Owner, \n\nWe have received a booking request for your hostel. Please visit your dashboard to approve or reject this request.\n\nBest regards, \nTeam Hostel Management',
    '<p>Dear Hostel Owner,</p><p>We have received a booking request for your hostel. Please visit your dashboard to approve or reject this request.</p><p>Best regards,<br>Team Hostel Management</p>'
  );

  await sendEmailWithRetry(mailOptions);
  return "Email sent to Hostel Owner";
};

export const sendReportEmail = async (email: string | undefined): Promise<string> => {
  if (!email) {
    return "Invalid owner email";
  }

  const mailOptions = createMailOptions(
    email,
    'Hostel Report Received',
    'Dear Hostel Owner, \n\nWe have received a report regarding your hostel.\n\nBest regards, \nTeam Hostel Management',
    '<p>Dear Hostel Owner,</p><p>We have received a report regarding your hostel.</p><p>Best regards,<br>Team Hostel Management</p>'
  );

  await sendEmailWithRetry(mailOptions);
  return "Email sent to Hostel Owner";
};

export const approvalEmail = async (email: string | undefined): Promise<string> => {
  if (!email) {
    return "Invalid owner email";
  }

  const mailOptions = createMailOptions(
    email,
    'Hostel Approved',
    'Dear Hostel Owner, \n\nYour hostel has been approved.\n\nBest regards, \nTeam Hostel Management',
    '<p>Dear Hostel Owner,</p><p>Your hostel has been approved.</p><p>Best regards,<br>Team Hostel Management</p>'
  );

  await sendEmailWithRetry(mailOptions);
  return "Email sent to Hostel Owner";
};

export const messageToOwner = async (email: string, message: string): Promise<string> => {
  if (!email || !message) {
    return "Invalid owner email or message";
  }

  const mailOptions = createMailOptions(
    email,
    'Hostel Report',
    `${message}\n\nBest regards, \nTeam Hostel Management`,
    `<p>${message}</p><p>Best regards,<br>Team Hostel Management</p>`
  );

  await sendEmailWithRetry(mailOptions);
  return "Email sent to Hostel Owner";
};

export const suspensionEmail = async (email: string | undefined): Promise<string> => {
  if (!email) {
    return "Invalid owner email";
  }

  const mailOptions = createMailOptions(
    email,
    'Hostel Suspended',
    'Dear Hostel Owner, \n\nYour hostel has been suspended.\n\nBest regards, \nTeam Hostel Management',
    '<p>Dear Hostel Owner,</p><p>Your hostel has been suspended.</p><p>Best regards,<br>Team Hostel Management</p>'
  );

  await sendEmailWithRetry(mailOptions);
  return "Email sent to Hostel Owner";
};

export const sendOtp = async (email: string | undefined, otp: string | undefined): Promise<string> => {
  if (!email || !otp) {
    throw new Error('Email and OTP are required');
  }

  const mailOptions = createMailOptions(
    email,
    'OTP Verification - Hostel Finder',
    `Your OTP for email verification is: ${otp}`,
    `<p>Dear User,</p><p>This is your OTP for email verification: <strong>${otp}</strong></p><p>Best regards,<br>Team Hostel Management</p>`
  );

  await sendEmailWithRetry(mailOptions);
  return `Account verification email sent to ${email}`;
};