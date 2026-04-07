import { z } from "zod";
import mongoose from "mongoose";

const baseSessionFields = {
    userId: z.instanceof(mongoose.Types.ObjectId).or(z.string()).optional(),
    title: z.string().min(5, 'The title of Session is required'),
    accessType:z.enum(["public", "private"]).default('private'),
    code: z.string().min(3).max(6).optional()
}



export const createSessionSchema = z.object({
  ...baseSessionFields
});