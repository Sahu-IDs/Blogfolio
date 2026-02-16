
import Message from "../models/message.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configure email transporter with Explicit TLS
const EMAIL_USER = process.env.EMAIL_USER || 'vaibhav12679@gmail.com';
console.log('📧 Configuring email transporter for:', EMAIL_USER);

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Verify connection on startup
transporter.verify(function (error, success) {
    if (error) {
        console.log('❌ Nodemailer Verification Error:', error);
    } else {
        console.log('✅ Nodemailer is ready to send emails');
    }
});

export const newMessage = async (request, response) => {
    try {
        console.log('📨 New message request received:', request.body);
        const { senderName, senderEmail, message, receiverId, ownerEmail } = request.body;

        // Save message to database
        const newMessage = new Message(request.body);
        await newMessage.save();
        console.log('💾 Message saved to database');

        // Determine recipient - Use environment variable or default
        let recipient = process.env.DEFAULT_RECIPIENT_EMAIL || 'vaibhav12679@gmail.com';

        // Try to respect ownerEmail if valid
        if (ownerEmail && ownerEmail.includes('@') && ownerEmail !== 'null' && ownerEmail !== 'undefined') {
            recipient = ownerEmail;
            console.log('📧 Using provided ownerEmail:', recipient);
        } else if (receiverId) {
            // Try to fetch from portfolio if ownerEmail invalid
            try {
                const Portfolio = (await import('../models/portfolio.js')).default;
                const contactInfo = await Portfolio.findOne({
                    userId: receiverId,
                    categories: { $in: ['contact', 'Contact'] }
                });

                if (contactInfo && contactInfo.email) {
                    recipient = contactInfo.email;
                    console.log('📧 Fetched email from portfolio:', recipient);
                } else {
                    console.log('⚠️ No contact email found in portfolio, using default:', recipient);
                }
            } catch (err) {
                console.log('⚠️ Could not fetch portfolio email:', err.message);
            }
        } else {
            console.log('⚠️ Using default recipient:', recipient);
        }

        console.log('🚀 Final Attempting to send email to:', recipient);

        // Prepare email
        const mailOptions = {
            from: `"Portfolio Contact" <${EMAIL_USER}>`,
            to: recipient,
            replyTo: senderEmail,
            subject: `🔔 New Message from ${senderName}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h2 style="color: #6366f1; margin-top: 0;">📬 New Contact Message</h2>
                    <hr style="border: 0; border-top: 1px solid #eee;" />
                    <p><strong>From:</strong> ${senderName}</p>
                    <p><strong>Email:</strong> <a href="mailto:${senderEmail}">${senderEmail}</a></p>
                    <p><strong>Message:</strong></p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #6366f1;">
                        ${message ? message.replace(/\n/g, '<br>') : 'No message content'}
                    </div>
                    <hr style="border: 0; border-top: 1px solid #eee; margin-top: 20px;" />
                    <p style="font-size: 12px; color: #888;">Received via Portfolio Contact Form • ${new Date().toLocaleString()}</p>
                </div>
            `
        };

        // Send email with detailed error handling
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('✅ EMAIL SENT SUCCESSFULLY!');
            console.log('📝 Message ID:', info.messageId);
        } catch (emailError) {
            console.error('❌ EMAIL SENDING FAILED:', emailError);
            console.error('❌ Error Message:', emailError.message);
        }

        return response.status(200).json({
            msg: 'Message sent successfully',
            isSuccess: true
        });

    } catch (error) {
        console.error('❌ CRITICAL ERROR in newMessage:', error);
        return response.status(500).json({ msg: error.message });
    }
}

export const getMessages = async (request, response) => {
    try {
        const messages = await Message.find({ receiverId: request.params.id });
        return response.status(200).json(messages);
    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
}
