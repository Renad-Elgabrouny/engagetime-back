import mongoose from 'mongoose';

const sessionSchema  = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    slug: String,
    accessType: {
        type: String,
        enum: ["public", "private"] 
    },
}, {
    timestamps: true
})

export const Session = mongoose.model("Session", sessionSchema);