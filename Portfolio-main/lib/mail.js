import nodemailer from "nodemailer";

// Create transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail", // or 'smtp' for custom SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use App Password for Gmail
    },
    // Alternative SMTP configuration (uncomment if using custom SMTP)
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT,
    // secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
  });
};

// Email template for notification (email you receive)
const createNotificationEmailTemplate = (formData) => {
  const { name, email, subject, message } = formData;

  return {
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin: 20px 0; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #667eea; }
            .field-label { font-weight: bold; color: #555; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
            .field-value { margin-top: 5px; font-size: 16px; }
            .message-field { white-space: pre-wrap; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .badge { display: inline-block; background: #28a745; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 New Contact Form Submission</h1>
              <div class="badge">Portfolio Website</div>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">👤 Name</div>
                <div class="field-value">${name}</div>
              </div>
              
              <div class="field">
                <div class="field-label">📧 Email</div>
                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              ${
                subject
                  ? `
              <div class="field">
                <div class="field-label">📝 Subject</div>
                <div class="field-value">${subject}</div>
              </div>
              `
                  : ""
              }
              
              <div class="field">
                <div class="field-label">💬 Message</div>
                <div class="field-value message-field">${message}</div>
              </div>
              
              <div class="footer">
                <p>Received on ${new Date().toLocaleString()}</p>
                <p><strong>Reply directly to this email to respond to ${name}</strong></p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${subject ? `Subject: ${subject}` : ""}

Message:
${message}

Received: ${new Date().toLocaleString()}
Reply to: ${email}
    `,
  };
};

// Auto-reply template (email sent to user)
const createAutoReplyTemplate = (name) => {
  return {
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank you for contacting me!</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
            .message { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745; }
            .contact-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .highlight { color: #667eea; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Message Received!</h1>
              <p>Thank you for reaching out</p>
            </div>
            <div class="content">
              <div class="message">
                <p>Hi <strong>${name}</strong>,</p>
                <p>Thank you for contacting me through my portfolio website! I've received your message and appreciate you taking the time to reach out.</p>
                <p><span class="highlight">I typically respond within 24 hours</span>, so you should hear back from me soon. I'll get back to you at the email address you provided.</p>
              </div>
              
              <div class="contact-info">
                <h3>📧 Alternative Contact Methods:</h3>
                <p><strong>Email:</strong> swayamcoder@gmail.com</p>
                <p><strong>Phone:</strong> +91 63713 52331</p>
              </div>
              
              <div class="footer">
                <p>Best regards,<br><strong>Swayam</strong></p>
                <p style="margin-top: 20px;">This is an automated confirmation. Please don't reply to this email.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Hi ${name},

Thank you for contacting me through my portfolio website! I've received your message and appreciate you taking the time to reach out.

I typically respond within 24 hours, so you should hear back from me soon. I'll get back to you at the email address you provided.

Alternative Contact Methods:
Email: swayamcoder@gmail.com
Phone: +91 63713 52331

Best regards,
Swayam

This is an automated confirmation. Please don't reply to this email.
    `,
  };
};

// Main email sending function
export const sendContactEmail = async (formData) => {
  try {
    const transporter = createTransporter();

    // Create email templates
    const notificationTemplate = createNotificationEmailTemplate(formData);
    const autoReplyTemplate = createAutoReplyTemplate(formData.name);

    // Email options for notification (to you)
    const notificationMailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL, // Your email where you want to receive messages
      replyTo: formData.email, // User's email for easy reply
      subject: `New Contact Form Submission${
        formData.subject ? `: ${formData.subject}` : ""
      }`,
      html: notificationTemplate.html,
      text: notificationTemplate.text,
    };

    // Email options for auto-reply (to user)
    const autoReplyMailOptions = {
      from: `"Swayam" <${process.env.EMAIL_USER}>`,
      to: formData.email,
      subject: "Thank you for contacting me! 🚀",
      html: autoReplyTemplate.html,
      text: autoReplyTemplate.text,
    };

    // Send both emails
    const [notificationResult, autoReplyResult] = await Promise.all([
      transporter.sendMail(notificationMailOptions),
      transporter.sendMail(autoReplyMailOptions),
    ]);

    return {
      success: true,
      notificationId: notificationResult.messageId,
      autoReplyId: autoReplyResult.messageId,
    };
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

// Test email configuration
export const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return { success: true, message: "Email configuration is valid" };
  } catch (error) {
    console.error("Email configuration test failed:", error);
    return { success: false, message: error.message };
  }
};
