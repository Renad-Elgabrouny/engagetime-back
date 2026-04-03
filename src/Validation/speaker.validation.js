import { z } from "zod";

const baseSpeakerFields = {
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username cannot exceed 50 characters")
    .trim(),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(60, "Slug cannot exceed 60 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and dashes"
    )
    .trim(),
  avatarUrl: z
    .string()
    .url("Avatar must be a valid URL")
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .max(500, "Bio cannot exceed 500 characters")
    .optional(),
  links: z
    .array(z.string().url("Each link must be a valid URL"))
    .optional()
    .default([]),
  awards: z
    .array(z.string().min(1, "Award cannot be empty"))
    .optional()
    .default([]),
  isPublic: z.boolean().default(true),
};

const speakerSchemas = {

  create: z.object({
    ...baseSpeakerFields,
  }),

  update: z.object({
    ...baseSpeakerFields,
    username: baseSpeakerFields.username.optional(),
    slug: baseSpeakerFields.slug.optional(),
  }),
};

export const validateSpeaker = (action, speakerData) => {
  if (!action) {
    return {
      success: false,
      error: "Action is required",
      details: null,
    };
  }

  const schema = speakerSchemas[action];
  if (!schema) {
    return {
      success: false,
      error: `Invalid action: ${action}. Must be one of: create, update`,
      details: null,
    };
  }

  const result = schema.safeParse(speakerData);

  if (!result.success) {
    const formattedErrors = result.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    return {
      success: false,
      error: "Validation failed",
      details: formattedErrors,
    };
  }

  return {
    success: true,
    data: result.data,
    error: null,
    details: null,
  };
};