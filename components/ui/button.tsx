interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text      : string;
  className?: string;
  isActive  : boolean;
  leftIcon ?: React.ReactNode;
}

export const Button = ({
  text,
  className,
  isActive,
  leftIcon,
  ...props
}: IButton) => {
  return (
    <button {...props} disabled={!isActive} className={`${!isActive && "!bg-[#888888]"} flex justify-center items-center dark:bg-bg-c-10 text-black w-full py-2 rounded-lg dark:hover:bg-[#ADAE5E] transition-all bg-[#C77D0A] hover:bg-[#c7750a] font-semibold ${className}`}>{leftIcon}{text}</button>
  )
};