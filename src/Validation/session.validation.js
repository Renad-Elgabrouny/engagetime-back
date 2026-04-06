import { z } from "zod";
import mongoose from "mongoose";

const baseSessionFields = {
    userId: z.instanceof(mongoose.Types.ObjectId).or(z.string()).optional(),
    title: z.string().min(5, 'The title of Session is required'),
    accessType:z.enum(["public", "private"]).default('private'),
    slug: z.string().min(3).max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase and use hyphens only")
}



export const createSessionSchema = z.object({
  ...baseSessionFields
});