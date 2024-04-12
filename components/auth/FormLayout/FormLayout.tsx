interface IFormLayout extends React.FormHTMLAttributes<HTMLFormElement> {
  title     : string;
  children  : React.ReactNode;
  className?: string;
}

export const FormLayout = ({
  title,
  children,
  className,
  ...props
}: IFormLayout) => {
  return (
    <form {...props} className={`auth-form ${className}`}>
      <h1 className="text-2xl">{title}</h1>
      {children}
    </form>
  )
};