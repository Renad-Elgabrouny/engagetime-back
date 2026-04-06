const mongoose = require("mongoose");

const PULSE_STATES = ["none", "got it", "confused", "lost"];

const attendeeSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
    deviceId: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    pulseState: {
      type: String,
      enum: PULSE_STATES,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

const Attendee = mongoose.model("Attendee", attendeeSchema);

module.exports = { Attendee, PULSE_STATES };