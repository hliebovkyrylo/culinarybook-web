interface IFormLayout {
  title   : string;
  children: React.ReactNode;
}

export const FormLayout = ({
  title,
  children
}: IFormLayout) => {
  return (
    <form className="auth-form">
      <h1 className="text-2xl">{title}</h1>
      {children}
    </form>
  )
};