"use client"

import { Button, Input } from "@nextui-org/react";
import { Cookies }       from "react-cookie";
import { z }             from "zod";
import Link              from "next/link";
import { useForm }       from "react-hook-form";
import { zodResolver }   from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { SignInUser } from "@/lib/controllers/auth.controller";

const signInSchema = z.object({
  email   : z.string().email(),
  password: z.string(),
});

export type FormData = z.infer<typeof signInSchema>;

const SignUp = () => {
  const cookies = new Cookies();

  const { handleSubmit, setError, formState: { errors}, register} = useForm<FormData>({
    defaultValues: {
      email   : "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = useCallback(async (values: FormData) => {
    try {
      const result = await SignInUser(values);

      cookies.set('accessToken', result.accessToken);

    } catch (error: any) {
      if (error.message.includes('user-not-found')) {
        setError("email", {message: "Account not found!"});
      }

      if (error.message.includes('wrong-data')) {
        setError("password", {message: "The entered data is incorrect!"});
      }
    }
  }, [SignInUser]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-neutral-900 p-8">
      <h1 className="text-2xl">Sign In</h1>
      <div className="my-8">
        <Input 
          errorMessage={errors.email?.message} 
          color={(errors.email || errors.password) && "danger"}
          {...register('email')} 
          type="email" 
          size="sm" 
          label="Email" 
          className="w-80 text-base mb-3" 
        />
        <Input 
          errorMessage={errors.password?.message} 
          color={errors.password && "danger"}
          {...register('password')} 
          type="password" 
          size="sm" 
          label="Password" 
          className="w-80 text-base mb-3"
        />
        <Button type="submit" className="w-80 bg-bg-c-10 text-black text-base mb-3">Sign In</Button>
      </div>
      <div className="flex">
        <p className="mr-1">Don’t have an accont yet?</p>
        <Link className="text-color-custom-yellow" href={"/sign-up"}>Sign Up</Link>
      </div>
    </form>
  )
};

export default SignUp;