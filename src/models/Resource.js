import mongoose from 'mongoose';

const resourceSchema  = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session'
    },
    title: String, 
    url: String
}, {
    timestamps: true
})

export const Resource = mongoose.model("Resource", resourceSchema);