import { forwardRef } from "react";

interface RecipeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className ?: string;
  placeholder: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, RecipeTextareaProps>(
  ({ placeholder, className, ...props }, ref) => {
  return (
    <textarea {...props} ref={ref} placeholder={placeholder} className={`custom-textarea ${className}`} />
  )
});

export default Textarea;