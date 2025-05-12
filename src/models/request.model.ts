import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedbackRequest extends Document {
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    receiverName: string;
    senderName: string;
    message: string;
    deadline: Date;
    status: 'pending' | 'rejected' | 'expired' | 'responded';
}

const FeedbackRequestSchema: Schema<IFeedbackRequest> = new Schema(
    {
        senderId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true, },
        receiverId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true, },
        receiverName: { type: String, required: true, },
        senderName: { type: String, required: true, },
        message: { type: String, required: true, trim: true, },
        deadline: { type: Date, required: true, },
        status: {
            type: String,
            enum: ['pending', 'rejected', 'expired', 'responded'],
            default: 'pending',
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const FeedbackRequestModel = mongoose.model<IFeedbackRequest>('FeedbackRequest', FeedbackRequestSchema);
export default FeedbackRequestModel
