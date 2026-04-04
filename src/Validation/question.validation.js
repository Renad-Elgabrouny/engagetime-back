import { z } from "zod";
import mongoose from "mongoose";

const baseQuestionFields = {
    sessionId: z.instanceof(mongoose.Types.ObjectId).or(z.string()),
    deviceId: z.string().uuid(),
    question: z.string().min(1, 'Question is required').max(500, 'Question cannot exceed 500 characters'),
    description: z.string().max(1000, 'Description cannot exceed 1000 characters').optional(),
    state: z.enum(['answered', 'notanswered']).default('notanswered'),
    upvotes: z.number().default(0).optional()
}



export const createQuestionSchema = z.object({
  ...baseQuestionFields
});