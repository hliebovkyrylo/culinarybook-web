"use client"

import { 
  AuthButton, 
  AuthIconButton, 
  AuthInput 
}                     from "@/components/auth";
import { 
  EyeIcon, 
  SlashEyeIcon 
}                     from "@/icons";
import { FormLayout } from "../FormLayout";
import { useState }   from "react";

const ChangePassword = () => {
  const [passwordInputType, setPasswordInputType]               = useState("password");
  const [confirmPasswordInputType, setConfirmPasswordInputType] = useState("password");

  const handleVisibleChange = (setInputType: React.Dispatch<React.SetStateAction<string>>, inputType: string) => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const togglePasswordVisibility        = () => handleVisibleChange(setPasswordInputType, passwordInputType);
  const toggleConfirmPasswordVisibility = () => handleVisibleChange(setConfirmPasswordInputType, confirmPasswordInputType);

  return (
    <FormLayout
      title="Change password"
    >
      <div className="my-6">
        <AuthInput
          type={"text"}
          errorMessage=""
          color="default"
          placeholder="Old password"
          className="!w-80"
        />
        <div className="relative mt-2">
          <AuthInput
            type={passwordInputType}
            errorMessage=""
            color="default"
            placeholder="New password"
          />
          <AuthIconButton
            firstIcon={<EyeIcon className="icon-eye" />}
            secondIcon={<SlashEyeIcon className="icon-eye" />}
            onClick={togglePasswordVisibility}
            inputType={passwordInputType}
          />
        </div>
        <div className="relative mt-2">
          <AuthInput
            type={confirmPasswordInputType}
            errorMessage=""
            color="default"
            placeholder="Confirm new password"
          />
          <AuthIconButton
            firstIcon={<EyeIcon className="icon-eye" />}
            secondIcon={<SlashEyeIcon className="icon-eye" />}
            onClick={toggleConfirmPasswordVisibility}
            inputType={confirmPasswordInputType}
          />
        </div>
      </div>
      <AuthButton
        isActive={true}
        text="Change password"
      />
    </FormLayout>
  )
};

export default ChangePassword;