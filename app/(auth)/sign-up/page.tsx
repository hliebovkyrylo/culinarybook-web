"use client"

import { useState }              from "react";
import { z }                     from "zod";
import Link                      from "next/link";
import { 
  AuthIconButton, 
  AuthInput, 
  FormLayout
}                                from "@/components/auth";
import { EyeIcon, SlashEyeIcon } from "@/icons";
import { Button }                from "@/ui";

const signUpSchema = z.object({
  email   : z.string().email(),
  username: z.string().min(2),
  name    : z.string(),
  password: z.string().min(8),
  image   : z.string(),
});

export type FormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [emailInput, setEmailInput]                     = useState<string>("");
  const [usernameInput, setUsernameInput]               = useState<string>("");
  const [nameInput, setNameInput]                       = useState<string>("");
  const [passwordInput, setPasswordInput]               = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");

  const isFieldsEmpty = emailInput !== "" && passwordInput !== "" && usernameInput !== "" && nameInput !== "" && confirmPasswordInput !== "";

  const [passwordInputType, setPasswordInputType]               = useState("password");
  const [confirmPasswordInputType, setConfirmPasswordInputType] = useState("password");

  const handleVisibleChange = (setInputType: React.Dispatch<React.SetStateAction<string>>, inputType: string) => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const togglePasswordVisibility        = () => handleVisibleChange(setPasswordInputType, passwordInputType);
  const toggleConfirmPasswordVisibility = () => handleVisibleChange(setConfirmPasswordInputType, confirmPasswordInputType);

  return (
    <FormLayout title="Sign Up">
      <div className="my-8 max-w-xs">
        <AuthInput
          type="email"
          errorMessage=""
          color="default"
          placeholder="Email"
          className="mb-2 max-w-xs"
          onChangeValue={(event) => setEmailInput(event.target.value)}
        />
        <AuthInput
          type="text"
          errorMessage=""
          color="default"
          placeholder="Username"
          className="mb-2 max-w-xs"
          onChangeValue={(event) => setUsernameInput(event.target.value)}
        />
        <AuthInput
          type="text"
          errorMessage=""
          color="default"
          placeholder="Name"
          className="mb-2 max-w-xs"
          onChangeValue={(event) => setNameInput(event.target.value)}
        />
        <div className="relative max-w-xs">
          <AuthInput
            type={passwordInputType}
            errorMessage=""
            color="default"
            placeholder="Password"
            className="mb-2 max-w-xs"
            onChangeValue={(event) => setPasswordInput(event.target.value)}
          />
          <AuthIconButton 
            firstIcon={<EyeIcon className="icon-eye" />}
            secondIcon={<SlashEyeIcon className="icon-eye" />}
            onClick={togglePasswordVisibility}
            inputType={passwordInputType}
          />
        </div>
        <div className="relative max-w-xs">
          <AuthInput
            type={confirmPasswordInputType}
            errorMessage=""
            color="default"
            placeholder="Confirm password"
            className="mb-2 max-w-xs"
            onChangeValue={(event) => setConfirmPasswordInput(event.target.value)}
          />
          <AuthIconButton 
            firstIcon={<EyeIcon className="icon-eye" />}
            secondIcon={<SlashEyeIcon className="icon-eye" />}
            onClick={toggleConfirmPasswordVisibility}
            inputType={confirmPasswordInputType}
          />
        </div>
        <Button
          isActive={isFieldsEmpty}
          text="Sign in"
          className={"max-w-xs mt-3"}
        />
      </div>
      <div className="flex">
        <p className="mr-1">Already have an accont?</p>
        <Link className="link-text" href={"/sign-in"}>Sign In</Link>
      </div>
    </FormLayout>
  )
};

export default SignUp;