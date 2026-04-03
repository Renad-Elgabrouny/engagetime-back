import mongoose from 'mongoose';
import { validateActivity, validateCorrectAnswer } from '../Validation/activity.validation.js';

const activitySchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: false
    },
    question: {
        type: String,
        required: [true, 'Question is required']
    },
    description: {
        type: String
    },
    type: {
        type: String,
        enum: ['mcq', 'yesno', 'opentext', 'rating'],
        required: [true, 'Activity type is required']
    },
    isQuiz: {
        type: Boolean,
        default: false
    },
    correctAnswer: {
        type: mongoose.Schema.Types.Mixed
    },
    status: {
        type: String,
        enum: ['start', 'pause'],
        default: 'start'
    },
    options: {
        type: [String]
    },
    minRating: {
        type: Number
    },
    MaxRating: {
        type: Number
    }
}, {
    timestamps: true
});

activitySchema.pre('save', async function(next) {

    const activityData = this.toObject();
    
    const validation = validateActivity(activityData);
    
    if (!validation.success) {
        const error = new Error(validation.error);
        if (validation.details) {
            error.message = validation.details.map(d => `${d.field}: ${d.message}`).join(', ');
        }
        return next(error);
    }
    
    const validatedData = validation.data;
    if (validatedData.options !== undefined) this.options = validatedData.options;
    if (validatedData.minRating !== undefined) this.minRating = validatedData.minRating;
    if (validatedData.MaxRating !== undefined) this.MaxRating = validatedData.MaxRating;
    if (validatedData.correctAnswer !== undefined) this.correctAnswer = validatedData.correctAnswer;
    
    next();
});


activitySchema.methods.validateCorrectAnswer = function(answer) {
    return validateCorrectAnswer(
        this.type,
        this.isQuiz,
        answer,
        {
            optionsLength: this.options?.length,
            minRating: this.minRating,
            maxRating: this.MaxRating
        }
    );
};

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;