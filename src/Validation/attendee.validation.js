const { z } = require("zod");
const { PULSE_STATES } = require("../models/Attendee"); 

export const baseAttendeeFields = {
  sessionId: z.string().min(1, "Session ID is required"),
  deviceId: z.string().min(1, "Device ID is required"),
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(30, "Username cannot exceed 30 characters")
    .optional(),
};

export const attendeeSchemas = {
  join: z.object({
    ...baseAttendeeFields,
  }),

  updatePulse: z.object({
    pulseState: z.enum(PULSE_STATES, {  
      message: `Pulse state must be one of: ${PULSE_STATES.join(", ")}`,
    }),
  }),
};

const validateAttendee = (action, attendeeData) => {
  if (!action) {
    return { success: false, error: "Action is required", details: null };
  }

  const schema = attendeeSchemas[action];
  if (!schema) {
    return {
      success: false,
      error: `Invalid action: ${action}. Must be one of: join, updatePulse`,
      details: null,
    };
  }

  const result = schema.safeParse(attendeeData);

  if (!result.success) {
    const formattedErrors = result.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return { success: false, error: "Validation failed", details: formattedErrors };
  }

  return { success: true, data: result.data, error: null, details: null };
};

module.exports = { validateAttendee }; 