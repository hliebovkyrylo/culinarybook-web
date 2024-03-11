import { ChevronDownIcon, ChevronUpIcon } from "@/icons";

interface ISelectButton {
  title     : string;
  className?: string;
  onClick   : () => void;
  isActive  : boolean;
}

export const SelectButton = ({
  title,
  className,
  onClick,
  isActive
}: ISelectButton) => {
  return (
    <button className={`select-button relative ${className}`} type="button" onClick={onClick}>
      {isActive ? <ChevronUpIcon className="absolute w-3 top-1.5 fill-[#666] right-1" /> : <ChevronDownIcon className="absolute w-3 top-1.5 fill-[#666] right-1" />}
      {title}
    </button>
  )
}