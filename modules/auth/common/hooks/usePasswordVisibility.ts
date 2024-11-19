import { useState } from "react";

export const usePasswordVisibility = () => {
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [confirmPasswordInputType, setConfirmPasswordInputType] =
    useState("password");

  const handleVisibleChange = (
    setInputType: React.Dispatch<React.SetStateAction<string>>,
    inputType: string
  ) => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const togglePasswordVisibility = () =>
    handleVisibleChange(setPasswordInputType, passwordInputType);
  const toggleConfirmPasswordVisibility = () =>
    handleVisibleChange(setConfirmPasswordInputType, confirmPasswordInputType);

  return {
    passwordInputType,
    confirmPasswordInputType,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  };
};
