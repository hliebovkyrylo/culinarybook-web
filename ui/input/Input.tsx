interface IInput {
  type         : string;
  placeholder  : string;
  className   ?: string;
  defaultValue?: string;
  value       ?: string;
}

export const Input = ({
  type,
  placeholder,
  className,
  defaultValue,
  value,
}: IInput) => {
  return (
    <input type={type} defaultValue={defaultValue} value={value} placeholder={placeholder} className={`custom-input ${className}`} />
  )
}