"use client"

import { Button, Input } from "@nextui-org/react";
import Link              from "next/link";
import { useForm }       from 'react-hook-form';
import { z }             from "zod";
import { zodResolver }   from "@hookform/resolvers/zod";
import { useCallback }   from "react";
import { SignUpUser }    from "@/lib/controllers/auth.controller";
import { Cookies }       from "react-cookie";

const signUpSchema = z.object({
  email   : z.string().email(),
  username: z.string().min(2),
  name    : z.string(),
  password: z.string().min(8),
  image   : z.string(),
});

export type FormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const cookies = new Cookies();

  const { handleSubmit, setError, formState: { errors }, register } = useForm<FormData>({
    defaultValues: {
      email   : "",
      username: "",
      name    : "",
      password: "",
      image   : "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = useCallback(async (values: FormData) => {
    try {
      const result = await SignUpUser(values);
  
      cookies.set('accessToken', result.accessToken);
    } catch (error: any) {
      if (error.message.includes('email-already-exist')) {
        setError('email', { message: 'Such email already exists!' });
        console.log('Email already exists:', error.message);
      }
  
      if (error.message.includes('username-already-exist')) {
        setError('username', { message: 'Such username already exists!' });
        console.log('Username already exists:', error.message);
      }
    }
  }, [SignUpUser]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-neutral-900 p-8">
      <h1 className="text-2xl">Sign Up</h1>
      <div className="my-8">
        <Input 
          type="email" 
          size="sm" 
          label="Email" 
          className="w-80 text-base mb-3" 
          {...register('email')} 
          color={errors.email && "danger"}
          errorMessage={errors.email && errors.email.message}
        />
        <Input 
          type="text" 
          size="sm" 
          label="Username" 
          className="w-80 text-base mb-3" 
          {...register('username')} 
          color={errors.username && "danger"}
          errorMessage={errors.username && errors.username.message}
        />
        <Input 
          type="text" 
          size="sm" 
          label="Name" 
          className="w-80 text-base mb-3" 
          {...register('name')} 
        />
        <Input 
          type="password" 
          size="sm" 
          label="Password" 
          className="w-80 text-base mb-3" 
          {...register('password')} 
        />
        <Button type="submit" className="w-80 bg-bg-c-10 text-black text-base mb-3">Sign Up</Button>
      </div>
      <div className="flex">
        <p className="mr-1">Already have an accont?</p>
        <Link className="text-color-custom-yellow" href={"/sign-in"}>Sign In</Link>
      </div>
    </form>
  )
};

export default SignUp;