import mongoose from 'mongoose';

const questionSchema  = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session'
    },
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendee'
    },
    question: String,
    description: String,
    state: {
        type: String, 
        enum: ['answered', 'notasnwered'],
        default: 'notanswered'
    },
    upvotes: Number
}, 
{
    timestamps: true
})

export const Question = mongoose.model('Question', questionSchema);