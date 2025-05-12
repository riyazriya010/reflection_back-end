import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    requestedId: mongoose.Types.ObjectId;
    formId: mongoose.Types.ObjectId;
    senderName: string;
    receiverName: string;
    rating?: number;
    message: string;
}

const Feedback: Schema<IFeedback> = new Schema(
    {
        senderId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true, },
        receiverId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true, },
        requestedId: { type: Schema.Types.ObjectId, ref: 'FeedbackRequest', required: true, },
        formId: { type: Schema.Types.ObjectId, ref: 'Form', required: true, },
        senderName: { type: String, required: true, },
        receiverName: { type: String, required: true, },
        rating: { type: Number, required: true, default: 0 },
        message: { type: String, required: true, trim: true, },
    },
    {
        timestamps: true,
    }
);

const FeedbackModel = mongoose.model<IFeedback>('Feedback', Feedback);
export default FeedbackModel
