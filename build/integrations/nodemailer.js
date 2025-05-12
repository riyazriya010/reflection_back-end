"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
class Mail {
    constructor() {
        this.transporter = (0, nodemailer_1.createTransport)({
            service: 'gmail',
            auth: {
                user: 'riyur017@gmail.com',
                pass: 'umxaxhxfoemodrqe'
            }
        });
        this.mailOptions = {
            from: 'riyur017@gmail.com',
            subject: 'Email Verification',
        };
    }
    sendFeedbackRequestMail(email, feedbackLink, receiverName, name, expireDate) {
        // console.log('mail class signup studnet link ::: ', feedbackLink)
        this.mailOptions.to = email,
            this.mailOptions.html = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #433D8B; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Tallect Reflection</h1>
    </div>
    
    <div style="padding: 20px;">
        <h2 style="color: #433D8B;">Feedback Request Received</h2>
        <p style="font-size: 16px; line-height: 1.5;">
            Hello <strong>${receiverName}</strong>,<br><br>
            Hope you doing well, You've received a feedback request from <strong>${name}</strong>.
            Please provide your feedback before it expires on <strong>${expireDate}</strong>.
        </p>
        
        <div style="text-align: center; margin: 25px 0;">
            <a href="${feedbackLink}" style="
                text-decoration: none;
                padding: 12px 24px;
                background-color: #433D8B;
                color: white;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                display: inline-block;
            ">
                Provide Feedback
            </a>
        </div>
        
        <p style="font-size: 14px; color: #666;">
            If you believe you received this request by mistake or have any questions,
            please contact your manager or system administrator.
        </p>
    </div>
    
    <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Tallect Reflection. All rights reserved.</p>
    </div>
</div>
`;
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(this.mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error.message);
                    reject(error);
                }
                else {
                    console.log('Email sent:', info.response);
                    resolve(info);
                }
            });
        });
    }
    sendRemainderMail(email, feedbackLink, requesterName, responderName) {
        this.mailOptions.to = email;
        this.mailOptions.subject = `Feedback Received from ${responderName}`;
        this.mailOptions.html = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #433D8B; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Tallect Reflection</h1>
    </div>
    
    <div style="padding: 20px;">
        <h2 style="color: #433D8B;">Feedback Response Received</h2>
        <p style="font-size: 16px; line-height: 1.5;">
            Hello <strong>${requesterName}</strong>,<br><br>
            Great news! You've received feedback from <strong>${responderName}</strong> 
            in response to your request.
        </p>
        
        <div style="text-align: center; margin: 25px 0;">
            <a href="${feedbackLink}" style="
                text-decoration: none;
                padding: 12px 24px;
                background-color: #433D8B;
                color: white;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                display: inline-block;
            ">
                View Feedback
            </a>
        </div>
        
        <div style="background-color: #f8f9fa; border-left: 4px solid #433D8B; padding: 12px; margin: 20px 0;">
            <p style="font-style: italic; margin: 0;">
                "Feedback is the breakfast of champions. Thank you for participating in our growth culture."
            </p>
        </div>
        
        <p style="font-size: 14px; color: #666;">
            You can view this feedback anytime in your Tallect Reflection dashboard.
        </p>
    </div>
    
    <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Tallect Reflection. All rights reserved.</p>
    </div>
</div>
`;
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(this.mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error.message);
                    reject(error);
                }
                else {
                    console.log('Email sent:', info.response);
                    resolve(info);
                }
            });
        });
    }
    sendDeadlineRemainderMail(email, receiverName, requesterName, feedbackLink, expireDate) {
        this.mailOptions.to = email;
        this.mailOptions.subject = `⏰ Feedback Deadline Reminder`;
        this.mailOptions.html = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #433D8B; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Tallect Reflection</h1>
      </div>

      <div style="padding: 20px;">
          <h2 style="color: #433D8B;">Reminder: Feedback Due Soon</h2>
          <p style="font-size: 16px; line-height: 1.5;">
              Hello <strong>${receiverName}</strong>,<br><br>
              This is a gentle reminder that your feedback for <strong>${requesterName}</strong> is due by <strong>${expireDate}</strong>.
          </p>

          <div style="text-align: center; margin: 25px 0;">
              <a href="${feedbackLink}" style="
                  text-decoration: none;
                  padding: 12px 24px;
                  background-color: #433D8B;
                  color: white;
                  border-radius: 5px;
                  font-size: 16px;
                  font-weight: bold;
                  display: inline-block;
              ">
                  Give Feedback
              </a>
          </div>

          <p style="font-size: 14px; color: #666;">
              Don't miss the opportunity to provide valuable insights. Your feedback matters!
          </p>
      </div>

      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Tallect Reflection. All rights reserved.</p>
      </div>
  </div>
  `;
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(this.mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error.message);
                    reject(error);
                }
                else {
                    console.log('Reminder email sent:', info.response);
                    resolve(info);
                }
            });
        });
    }
}
exports.default = Mail;
