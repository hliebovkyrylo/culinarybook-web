import { z } from "zod";

export const createCommentReplySchema = z.object({
  commentText: z.string().min(1),
});

export type CreateCommentReplyFormData = z.infer<
  typeof createCommentReplySchema
>;
