import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session'
    },
    deviceId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Attendee',
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    description: String,
    state: {
        type: String,
        enum: ['answered', 'notanswered'],
        default: 'notanswered'
    },
    upvotes: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    })

export const Question = mongoose.model('Question', questionSchema);