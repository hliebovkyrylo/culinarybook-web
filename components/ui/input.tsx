import { cn }                from '@/lib/utils';
import React, { forwardRef } from 'react';

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  color     : "danger" | "default";
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ color, className, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={cn(`dark:bg-bg-c-2 dark:text-white w-full outline-none p-3 text-base dark:hover:bg-bg-c-3 dark:focus:bg-bg-c-3 transition-all rounded-lg hover:bg-slate-100 focus:bg-slate-100 ${color === "danger" ? "!bg-red-500" : ""
          }`, className)
        }
      />
    );
  }
);