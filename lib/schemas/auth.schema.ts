import { z } from "zod";

export const signUpSchema = z.object({
  email   : z.string().email(),
  username: z.string(),
  name    : z.string(),
  password: z.string(),
  image   : z.string(),
});

export const signInShema = z.object({
  email   : z.string().email(),
  password: z.string(),
});

export type ISignUpSchema = z.infer<typeof signUpSchema>;
export type ISignInSchema = z.infer<typeof signInShema>;