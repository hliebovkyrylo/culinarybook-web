import { z } from "zod";

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmNewPassword: z.string().min(8),
}).superRefine((schema, ctx) => {
  if (schema.confirmNewPassword !== schema.newPassword) {
    ctx.addIssue({
      path: ['confirmPassword'],
      code: 'custom',
      message: `Passwords don't match`
    });
  }
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;