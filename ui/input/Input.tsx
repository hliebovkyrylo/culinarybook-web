interface IInput {
  type       : string;
  placeholder: string;
  className ?: string;
}

export const Input = ({
  type,
  placeholder,
  className,
}: IInput) => {
  return (
    <input type={type} placeholder={placeholder} className={`custom-input ${className}`} />
  )
}