import React, { forwardRef } from 'react';

interface IAuthInput extends React.InputHTMLAttributes<HTMLInputElement> {
  color: "danger" | "default";
}

export const AuthInput = forwardRef<HTMLInputElement, IAuthInput>(
  ({ color, className, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={`auth-input ${color === "danger" ? "!bg-red-500" : "border-none"
          } ${className}`}
      />
    );
  }
);