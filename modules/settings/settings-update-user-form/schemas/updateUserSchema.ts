import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(2),
  username: z.string().min(6)
    .refine(value => !/\s/.test(value), {
      message: "The username must not contain spaces"
    })
    .refine(value => !/[!@#$%^&*(),.?":{}|<>]/g.test(value), {
      message: "The username must not contain special characters"
    }),
  isPrivate: z.boolean(),
  image: z.string(),
  backgroundImage: z.string(),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;