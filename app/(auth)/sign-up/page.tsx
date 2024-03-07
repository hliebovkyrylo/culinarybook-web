"use client"

import { 
  useState
}                        from "react";
import { z }             from "zod";
import Link              from "next/link";
import { AuthButton, AuthInput } from "@/components/auth";
import { EyeIcon, SlashEyeIcon } from "@/icons";

const signUpSchema = z.object({
  email   : z.string().email(),
  username: z.string().min(2),
  name    : z.string(),
  password: z.string().min(8),
  image   : z.string(),
});

export type FormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const isFieldsEmpty = emailInput !== "" && passwordInput !== "" && usernameInput !== "" && nameInput !== "";

  const [passwordInputType, setPasswordInputType] = useState("password");

  const handleVisibleChange = () => {
    setPasswordInputType(passwordInputType === "password" ? "text" : "password");
  };

  return (
    <form className="auth-form">
      <h1 className="text-2xl">Sign Up</h1>
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
          <button className="absolute right-4 top-4" type="button" onClick={handleVisibleChange}>
            {passwordInputType === "password" ? (
              <EyeIcon className="icon-eye" />
            ) : (
              <SlashEyeIcon className="icon-eye" />
            )}
          </button>
        </div>
        <AuthButton
          isActive={isFieldsEmpty}
          text="Sign in"
          className={"!w-80 mt-3"}
        />
      </div>
      <div className="flex">
        <p className="mr-1">Already have an accont?</p>
        <Link className="link-text" href={"/sign-in"}>Sign In</Link>
      </div>
    </form>
  )
};

export default SignUp;