const { z } = require("zod"); 

const baseAnswerFields = {
  pollId: z.string().min(1, "Poll ID is required"),
  deviceId: z.string().min(1, "Device ID is required"),
};

const answerSchemas = {
  mcq: z.object({
    ...baseAnswerFields,
    answer: z.number().int().min(0, "Answer must be a valid option index"),
  }),

  yesno: z.object({
    ...baseAnswerFields,
    answer: z.enum(["yes", "no"], {
      message: 'Answer must be "yes" or "no"',
    }),
  }),

  opentext: z.object({
    ...baseAnswerFields,
    answer: z
      .string()
      .min(1, "Answer cannot be empty")
      .max(1000, "Answer cannot exceed 1000 characters"),
  }),

  rating: z
    .object({
      ...baseAnswerFields,
      answer: z.number().int(),
      minRating: z.number().int().min(1).default(1),
      maxRating: z.number().int().max(10).default(5),
    })
    .refine(
      (data) => data.answer >= data.minRating && data.answer <= data.maxRating,
      {
        message: (data) =>
          `Answer must be between ${data.minRating} and ${data.maxRating}`,
        path: ["answer"],
      }
    ),
};

const validateAnswer = (type, answerData) => {  
  if (!type) {
    return { success: false, error: "Activity type is required", details: null };
  }

  const schema = answerSchemas[type];
  if (!schema) {
    return {
      success: false,
      error: `Invalid type: ${type}. Must be one of: mcq, yesno, opentext, rating`,
      details: null,
    };
  }

  const result = schema.safeParse(answerData);

  if (!result.success) {
    const formattedErrors = result.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return { success: false, error: "Validation failed", details: formattedErrors };
  }

  return { success: true, data: result.data, error: null, details: null };
};

module.exports = { validateAnswer }; 