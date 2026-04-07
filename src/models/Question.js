const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session'
    },
    deviceId: {
        type: String,
        required: true,
        trim: true,
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

const Question = mongoose.model('Question', questionSchema);
module.exports={Question};