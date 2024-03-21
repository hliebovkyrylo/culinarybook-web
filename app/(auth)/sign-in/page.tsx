"use client"

import { useState }              from "react";
import { z }                     from "zod";
import Link                      from "next/link";
import { 
  AuthIconButton, 
  AuthInput, 
  FormLayout}                    from "@/components/auth";
import { EyeIcon, SlashEyeIcon } from "@/icons";
import { Button }                from "@/ui";

const signInSchema = z.object({
  email   : z.string().email(),
  password: z.string(),
});

export type FormData = z.infer<typeof signInSchema>;

const SignUp = () => {
  const [emailInput, setEmailInput]       = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const isFieldsEmpty = emailInput !== "" && passwordInput !== "";

  const [passwordInputType, setPasswordInputType] = useState("password");

  const handleVisibleChange = () => {
    setPasswordInputType(passwordInputType === "password" ? "text" : "password");
  };

  return (
    <FormLayout title="Sign In">
      <div className="my-8">
        <AuthInput
          type="email"
          errorMessage=""
          color="default"
          placeholder="Email"
          className="mb-2"
          onChangeValue={(event) => setEmailInput(event.target.value)}
        />
        <div className="relative w-full">
          <AuthInput
            type={passwordInputType}
            errorMessage=""
            color="default"
            placeholder="Password"
            className="mb-2"
            onChangeValue={(event) => setPasswordInput(event.target.value)}
          />
          <AuthIconButton 
            firstIcon={<EyeIcon className="icon-eye" />}
            secondIcon={<SlashEyeIcon className="icon-eye" />}
            onClick={handleVisibleChange}
            inputType={passwordInputType}
          />
        </div>
        <div>
          <Link className="link-text text-sm" href={"/#"}>Forgot password?</Link>
        </div>
        <Button
          isActive={isFieldsEmpty}
          text="Sign in"
          className={"!w-80 mt-3"}
        />
      </div>
      <div className="flex">
        <p className="mr-1">Don’t have an accont yet?</p>
        <Link className="link-text" href={"/sign-up"}>Sign Up</Link>
      </div>
    </FormLayout>
  )
};

export default SignUp;