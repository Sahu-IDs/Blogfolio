
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: true
    },
    senderEmail: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    receiverId: {
        type: String, // User ID of the portfolio owner
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('message', MessageSchema);

export default Message;
