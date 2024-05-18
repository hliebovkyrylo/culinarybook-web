interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text      : string;
  className?: string;
  isActive  : boolean;
}

export const Button = ({
  text,
  className,
  isActive,
  ...props
}: IButton) => {
  return (
    <button {...props} disabled={!isActive} className={`${!isActive && "auth-button-disabled"} auth-button font-semibold ${className}`}>{text}</button>
  )
};