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


export { sendRejectionEmail, sendApprovalEmail, sendBookingApprovalEmail, sendBookingRejectionEmail };
