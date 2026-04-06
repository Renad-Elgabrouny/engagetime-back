const mongoose = require("mongoose");

const answrSchema = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },
    deviceId: {
      type: String,
      required: true,
      trim: true,
      ref: "Attendee"
    },
    answer:{
      type:mongoose.Schema.Types.Mixed,
      required:true,
    },
    isCorrect:{
      type:Boolean,
      default:false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: false, 
  }
  
)
const Answer = mongoose.model("Answer",answrSchema);
module.exports={Answer};