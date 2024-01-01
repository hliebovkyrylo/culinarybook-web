"use server"

import jwt from "jsonwebtoken";

const JWT_SECRET     = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

interface IPayload {
  id: string;
};

export const createAccessToken = (id: string) => {
  return jwt.sign(
    {
      id
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN
    }
  );
};