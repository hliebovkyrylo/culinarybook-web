interface IAuthButton {
  isActive  : boolean;
  text      : string;
  className?: string;
};

export const AuthButton = ({
  isActive,
  text,
  className,
}: IAuthButton) => {
  return (
    <button type={`submit`} disabled={!isActive} className={`auth-button ${!isActive && "!bg-[#A7A7A7]"} ${className}`}>{text}</button>
  )
};