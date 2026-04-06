import { z } from "zod";

const baseUserFields = {
  email: z
  .email("Invalid email address")
  .min(1, "Email is required")
  .toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
};

const userSchemas = {
  register: z
    .object({
      ...baseUserFields,
      confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),

  login: z.object({
    email: baseUserFields.email,
    password: z.string().min(1, "Password is required"),
  }),
};

export const validateUser = (action, userData) => {
  if (!action) {
    return {
      success: false,
      error: "Action is required",
      details: null,
    };
  }

  const schema = userSchemas[action];
  if (!schema) {
    return {
      success: false,
      error: `Invalid action: ${action}. Must be one of: register, login`,
      details: null,
    };
  }

  const result = schema.safeParse(userData);

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