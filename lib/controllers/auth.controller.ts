"use server"

import { 
  ISignInSchema, 
  ISignUpSchema 
}                            from "../schemas/auth.schema";
import { userService }       from "../services/user.service";
import bcrypt                from "bcrypt";
import { createAccessToken } from "../utils/token";

export async function SignUpUser(data: ISignUpSchema) {
  try {
    const userWithSuchEmail    = await userService.findUserByEmail(data.email);
    const userWithSuchUsername = await userService.findUserByUsername(data.username);

    if (userWithSuchEmail !== null) {
      throw new Error("email-already-exists!")
    }

    if (userWithSuchUsername !== null) {
      throw new Error("username-already-exist!")
    }

    const password    = await bcrypt.hash(data.password, 10);
    const user        = await userService.createUser({ ...data, password });
    const accessToken = createAccessToken(user.id);

    return ({ accessToken });
  } catch (error: any) {
    throw new Error(`Error message: ${error.message}`);
  }
}

export async function SignInUser(data: ISignInSchema) {
  try {
    const user = await userService.findUserByEmail(data.email);

    if (user === null) {
      throw new Error("user-not-found");
    }

    const isCorrectPassword = user && (await bcrypt.compare(data.password, user.password));

    if (!isCorrectPassword) {
      throw new Error("wrong-data");
    }

    const accessToken = createAccessToken(user.id);

    return ({ accessToken });

  } catch (error: any) {
    throw new Error(`Error message: ${error.message}`);
  }
};