import { z } from "zod";

export const createCommentSchema = z.object({
  commentText: z.string().min(1),
  grade: z.number().min(1).max(5)
});

export type CreateCommentFormData = z.infer<typeof createCommentSchema>;