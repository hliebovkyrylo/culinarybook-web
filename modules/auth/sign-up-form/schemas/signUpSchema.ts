import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    username: z
      .string()
      .min(2)
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Only English letters, numbers, and underscores are allowed"
      )
      .transform((value) => value.toLowerCase()),
    name: z.string().min(2),
    password: z.string().min(8),
    image: z.string(),
    confirmPassword: z.string().default(""),
  })
  .superRefine((schema, ctx) => {
    if (schema.confirmPassword !== schema.password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: `Passwords don't match`,
      });
    }
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
