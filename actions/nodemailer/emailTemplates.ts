'use server';
import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';

// Set up the transporter for sending emails
const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like 'smtp' if needed
  auth: {
    user: 'uisrar293@gmail.com',  // Email address for sending emails
    pass: 'xrpx vezr mand ashs',  // Application-specific password or normal password
  },
});

// Function to send a rejection email
const sendRejectionEmail = async (email: string | undefined): Promise<void> => {
    if(!email){
        console.log('no email')
        return
    }
  try {
    const mailOptions: SendMailOptions = {
      from: 'uisrar293@gmail.com' as string,
      to: email,
      subject: 'Hostel Booking Request Rejected',
      text: 'Dear Hostel Owner, \n\nYour hostel booking request has been rejected. Please contact support for more details.\n\nBest regards, \nTeam Hostel Management',
      html: '<p>Dear Hostel Owner,</p><p>Your hostel booking request has been <strong>rejected</strong>. Please contact support for more details.</p><p>Best regards,<br>Team Hostel Management</p>',
    };

    await transporter.sendMail(mailOptions);
    console.log(`Rejection email sent to ${email}`);
  } catch (error) {
    console.error('Error sending rejection email:', error);
    throw new Error('Error sending rejection email');
  }
};

// Function to send an approval email
const sendApprovalEmail = async (email: string | undefined): Promise<void> => {
    if(!email){
        console.log('no email')
        return
    }
  try {
    const mailOptions: SendMailOptions = {
      from: process.env.EMAIL_USER as string,
      to: email,
      subject: 'Hostel Booking Request Approved',
      text: 'Dear Hostel Owner, \n\nYour hostel booking request has been approved. Congratulations! If you have any questions, please contact support.\n\nBest regards, \nTeam Hostel Management',
      html: '<p>Dear Hostel Owner,</p><p>Your hostel booking request has been <strong>approved</strong>. Congratulations! If you have any questions, please contact support.</p><p>Best regards,<br>Team Hostel Management</p>',
    };

    await transporter.sendMail(mailOptions);
    console.log(`Approval email sent to ${email}`);
  } catch (error) {
    console.error('Error sending approval email:', error);
    throw new Error('Error sending approval email');
  }
};


const sendBookingApprovalEmail = async (email: string | undefined): Promise<void> => {
    if (!email) {
      console.log('No email provided');
      return;
    }

    try {
      const mailOptions: SendMailOptions = {
        from: 'uisrar293@gmail.com', // Replace with your sender email
        to: email,
        subject: 'Booking Request Approved',
        text: 'Dear User, \n\nYour booking request has been approved. Thank you for choosing our service. If you have any questions, feel free to contact us.\n\nBest regards, \nTeam Hostel Management',
        html: `<p>Dear User,</p>
               <p>Your booking request has been <strong>approved</strong>. Thank you for choosing our service.</p>
               <p>Best regards,<br>Team Hostel Management</p>`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Booking approval email sent to ${email}`);
    } catch (error) {
      console.error('Error sending booking approval email:', error);
      throw new Error('Error sending booking approval email');
    }
  };


  const sendBookingRejectionEmail = async (email: string | undefined): Promise<void> => {
    if (!email) {
      console.log('No email provided');
      return;
    }

    try {
      const mailOptions: SendMailOptions = {
        from: 'uisrar293@gmail.com', // Replace with your sender email
        to: email,
        subject: 'Booking Request Rejected',
        text: 'Dear User, \n\nWe regret to inform you that your booking request has been rejected. Please contact support for further assistance.\n\nBest regards, \nTeam Hostel Management',
        html: `<p>Dear User,</p>
               <p>We regret to inform you that your booking request has been <strong>rejected</strong>. Please contact support for further assistance.</p>
               <p>Best regards,<br>Team Hostel Management</p>`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Booking rejection email sent to ${email}`);
    } catch (error) {
      console.error('Error sending booking rejection email:', error);
      throw new Error('Error sending booking rejection email');
    }
  };

  const sendBookingStatusEmail = async (email: string | undefined, status: string | undefined): Promise<void> => {
    if (!email) {
      console.log('No email provided');
      return;
    }

    try {
      const mailOptions: SendMailOptions = {
        from: 'uisrar293@gmail.com', // Replace with your sender email
        to: email,
        subject: 'Booking Status',
        text: `Dear User, \n\nWe are here inform you that your booking request status updated to ${status} . Please contact support for further assistance.\n\nBest regards, \nTeam Hostel Management`,
        html: `<p>Dear User,</p>
               <p>Dear User, \n\nWe are here inform you that your booking request status updated to ${status} . Please contact support for further assistance.Best regards, Team Hostel Management</p>
               <p>Best regards,<br>Team Hostel Management</p>`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Booking rejection email sent to ${email}`);
    } catch (error) {
      console.error('Error sending booking rejection email:', error);
      throw new Error('Error sending booking rejection email');
    }
  };

  const sendBookingRequestEmail = async (email: string | undefined): Promise<string> => {
    if (!email) {
      console.log('No email provided');
      return "Invalid owner email";
    }

    try {
      const mailOptions: SendMailOptions = {
        from: 'uisrar293@gmail.com', // Replace with your sender email
        to: email,
        subject: 'Booking Request Received',
        text: 'Dear Hostel Owner, \n\nWe have received a booking request for you hostel. Please visit you dashboard to approve or reject this request.\n\nBest regards, \nTeam Hostel Management',
        html: `<p>Dear User,</p>
               <p>We have received a booking request for you hostel. Please visit you dashboard to approve or reject this request.</p>
               <p>Best regards,<br>Team Hostel Management</p>`,
      };

      await transporter.sendMail(mailOptions);
      return "Email is sent to Hostel Owner";
    } catch (error) {
      console.error('Error sending booking request email:', error);
      throw new Error('Error sending booking request email');
    }
  };

  const sendReportEmail = async (email: string | undefined): Promise<string> => {
    if (!email) {
      console.log('No email provided');
      return "Invalid owner email";
    }

    try {
      const mailOptions: SendMailOptions = {
        from: 'uisrar293@gmail.com', // Replace with your sender email
        to: email,
        subject: 'Booking Request Received',
        text: 'Dear Hostel Owner, \n\nWe have received a report request for you hostel.\n\nBest regards, \nTeam Hostel Management',
        html: `<p>Dear User,</p>
               <p>We have received a report request for you hostel.</p>
               <p>Best regards,<br>Team Hostel Management</p>`,
      };

      await transporter.sendMail(mailOptions);
      return "Email is sent to Hostel Owner";
    } catch (error) {
      console.error('Error sending booking request email:', error);
      throw new Error('Error sending booking request email');
    }
  };
  const approvalEmail = async (email: string | undefined): Promise<string> => {
    if (!email) {
      console.log('No email provided');
      return "Invalid owner email";
    }

    try {
      const mailOptions: SendMailOptions = {
        from: 'uisrar293@gmail.com', // Replace with your sender email
        to: email,
        subject: 'Hostel approved',
        text: 'Dear Hostel Owner, \n\nYour hostel is approved.\n\nBest regards, \nTeam Hostel Management',
        html: `<p>Dear User,</p>
               <p>Your hostel is approved.</p>
               <p>Best regards,<br>Team Hostel Management</p>`,
      };

      await transporter.sendMail(mailOptions);
      return "Email is sent to Hostel Owner";
    } catch (error) {
      console.error('Error sending booking request email:', error);
      throw new Error('Error sending booking request email');
    }
  };

  const messageToOwner = async (email: string, message: string): Promise<string> => {
    if (!email || !message) {
      console.log('No email provided');
      return "Invalid owner email";
    }

    try {
      const mailOptions: SendMailOptions = {
        from: 'uisrar293@gmail.com', // Replace with your sender email
        to: email,
        subject: 'Hostel Report',
        text: `${message}\n\nBest regards, \nTeam Hostel Management`,
        html: `
               <p>${message}</p>
               <p>Best regards,<br>Team Hostel Management</p>`,
      };

      await transporter.sendMail(mailOptions);
      return "Email is sent to Hostel Owner";
    } catch (error) {
      console.error('Error sending booking request email:', error);
      throw new Error('Error sending booking request email');
    }
  };

  const suspensionEmail = async (email: string | undefined): Promise<string> => {
    if (!email) {
      console.log('No email provided');
      return "Invalid owner email";
    }

    try {
      const mailOptions: SendMailOptions = {
        from: 'uisrar293@gmail.com', // Replace with your sender email
        to: email,
        subject: 'Hostel approved',
        text: 'Dear Hostel Owner, \n\nYour hostel is suspended.\n\nBest regards, \nTeam Hostel Management',
        html: `<p>Dear User,</p>
               <p>Your hostel is suspended.</p>
               <p>Best regards,<br>Team Hostel Management</p>`,
      };

      await transporter.sendMail(mailOptions);
      return "Email is sent to Hostel Owner";
    } catch (error) {
      console.error('Error sending booking request email:', error);
      throw new Error('Error sending booking request email');
    }
  };

  const sendOtp = async (email: string | undefined, otp: string | undefined) =>{
    if (!email || !otp) {
      console.log('No email provided');
      return;
    }
    try {
      const mailOptions: SendMailOptions = {
        from: 'uisrar293@gmail.com', // Replace with your sender email
        to: email,
        subject: 'OTP Verification, Hostel Finder',
        text: 'OTP Verification, Hostel Finder',
        html: `<p>Dear User,</p>
               <p>This is your OTP for email verification: <strong>${otp}</strong></p>
               <p>Best regards,<br>Team Hostel Management</p>`,
      };

      await transporter.sendMail(mailOptions);
      return `Account verification email sent to ${email}`;
    } catch (error) {
      console.error('Error sending otp:', error);
      throw new Error('Error otp');
    }
  }
 

export { sendRejectionEmail, sendApprovalEmail, sendBookingApprovalEmail, sendBookingRejectionEmail, sendOtp, sendBookingRequestEmail, approvalEmail, sendReportEmail, suspensionEmail, messageToOwner, sendBookingStatusEmail };
