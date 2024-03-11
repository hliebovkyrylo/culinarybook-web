interface ISelectField {
  value     : string;
  id        : string;
  className?: string;
  icon     ?: React.ReactNode;
  onClick   : () => void;
}

export const SelectField = ({
  value,
  id,
  className,
  icon,
  onClick,
}: ISelectField) => {
  return (
    <button type="button" className={`select-field ${className}`} onClick={onClick}>
      <li
        key={id}
      >
        {icon}
        {value}
      </li>
    </button>
  )
}