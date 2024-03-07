interface IAuthInput {
  type          : string;
  errorMessage ?: string;
  color         : "danger" | "default";
  placeholder   : string;
  className    ?: string;
  onChangeValue?: (event: any) => void;
};

export const AuthInput = ({
  type,
  errorMessage,
  color,
  placeholder,
  className,
  onChangeValue,
}: IAuthInput) => {
  return (
    <>
      <input className={`auth-input ${color === "danger" ? "!bg-red-500" : "border-none"} ${className} `} onChange={onChangeValue} type={type} placeholder={placeholder} />
      <label htmlFor="auth-input" className="text-red-500 text-sm">{errorMessage}</label>
    </>
  )
}