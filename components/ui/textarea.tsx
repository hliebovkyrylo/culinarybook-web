import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface RecipeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className ?: string;
  placeholder: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, RecipeTextareaProps>(
  ({ placeholder, className, ...props }, ref) => {
  return (
    <textarea {...props} ref={ref} placeholder={placeholder} className={cn('dark:bg-bg-c-2 dark:hover:bg-bg-c-3 py-2 px-3 rounded-xl outline-none transition-colors hover:bg-slate-100', className)} />
  )
});