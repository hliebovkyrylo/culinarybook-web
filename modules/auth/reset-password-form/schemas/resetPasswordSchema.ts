import { z } from "zod";

export const resetPasswordSchema = z.object({
  password       : z.string().min(8),
  confirmPassword: z.string()
}).superRefine((schema, ctx) => {
  if (schema.confirmPassword !== schema.password) {
    ctx.addIssue({
      path   : ['confirmPassword'],
      code   : 'custom',
      message: `Passwords don't match`
    });
  }
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;