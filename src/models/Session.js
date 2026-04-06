const mongoose = require('mongoose');

const sessionSchema  = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    accessType: {
        type: String,
        enum: ["public", "private"] 
    },
}, {
    timestamps: true
})

const Session = mongoose.model("Session", sessionSchema);

module.exports = {Session};