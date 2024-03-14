interface IRecipeContentCard {
  text      : React.ReactNode;
  className?: string
}

export const RecipeContentCard = ({
  text, 
  className,
}: IRecipeContentCard) => {
  return (
    <article className={`recipe-content-card ${className}`}>
      {text}
    </article>
  )
}