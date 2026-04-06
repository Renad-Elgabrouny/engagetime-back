const { z } = require("zod");
const mongoose = require("mongoose");

const baseResourceFields = {
    sessionId: z.instanceof(mongoose.Types.ObjectId).or(z.string()).optional(),
    title: z.string().min(5, 'The title of resources is required'),
    url: z.string().url('Recourses must be a valid url')
}


const resourceSchema = z.discriminatedUnion("type", [
  z.object({
    ...baseResourceFields,
    type: z.literal("pdf"),
  }),
  z.object({
    ...baseResourceFields,
    type: z.literal("video"),
  }),
  z.object({
    ...baseResourceFields,
    type: z.literal("link"),
  }),
  z.object({
    ...baseResourceFields,
    type: z.literal("image"),
  }),
]);

module.exports={resourceSchema}