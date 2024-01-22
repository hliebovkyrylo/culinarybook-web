interface RecipeTextareaProps {
  className ?: string;
  placeholder: string;
}

const RecipeTextarea = ({
  className,
  placeholder
}: RecipeTextareaProps) => {
  return (
    <div className="relative">
      <textarea placeholder={placeholder} className={`custom-textarea ${className}`} />
    </div>
  )
};

export default RecipeTextarea;