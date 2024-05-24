import { z } from "zod";

export const signUpSchema = z.object({
  email          : z.string().email(),
  username       : z.string().min(2).refine(value => !/\s/.test(value), {
    message: "The username must not contain spaces"
  }),
  name           : z.string().min(2),
  password       : z.string().min(8),
  image          : z.string(),
  confirmPassword: z.string().default(''),
}).superRefine((schema, ctx) => {
  if (schema.confirmPassword !== schema.password) {
    ctx.addIssue({
      path   : ['confirmPassword'],
      code   : 'custom',
      message: `Passwords don't match`
    });
  }
});

export type SignUpFormData = z.infer<typeof signUpSchema>;