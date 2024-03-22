interface IFormLayout {
  title     : string;
  children  : React.ReactNode;
  className?: string;
}

export const FormLayout = ({
  title,
  children,
  className
}: IFormLayout) => {
  return (
    <form className={`auth-form ${className}`}>
      <h1 className="text-2xl">{title}</h1>
      {children}
    </form>
  )
};