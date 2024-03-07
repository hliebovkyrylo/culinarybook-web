import React from "react";

interface IAuthNumberInput {
  onKeyDown : (event: React.KeyboardEvent<HTMLInputElement>) => void;
  digit     : string;
  onChange  : (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const AuthNumberInput = React.forwardRef<HTMLInputElement, IAuthNumberInput>(({ 
  onKeyDown, 
  digit, 
  onChange, 
  className 
}, ref) => {
    return (
      <input 
        ref={ref}
        className={`auth-numberInput ${className}`}
        type="text" 
        maxLength={1} 
        onKeyDown={(event) => onKeyDown(event)}
        value={digit}
        onChange={(event) => onChange(event)} // Добавлен onChange
      />
    );
  }
);