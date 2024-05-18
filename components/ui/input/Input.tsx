import { forwardRef } from "react";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  type         : string;
  className   ?: string;
  value       ?: string;
}

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ type, className, value, ...props}, ref) => {
    return (
      <input type={type} ref={ref} {...props} className={`custom-input ${className}`} />
    )
  }
) 
  