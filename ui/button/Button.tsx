interface IButton {
  text      : string;
  onClick  ?: () => void;
  className?: string; 
  isActive  : boolean;
}

const Button = ({
  text,
  onClick,
  className,
  isActive
}: IButton) => {
  return (
    <button onClick={onClick} disabled={isActive} className={`auth-button font-semibold ${className}`}>{text}</button>
  )
};

export default Button;