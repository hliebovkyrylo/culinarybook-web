import { ReactNode } from "react";

interface DropMenuProps {
  onClick  ?: () => void
  icon     ?: ReactNode;
  textIcon ?: ReactNode;
  text      : string
  className?: string;
};

export const DropMenuButton = ({
  onClick,
  icon,
  text,
  className,
  textIcon
}: DropMenuProps) => {
  return (
    <button className={`dropmenu__button ${className}`} onClick={onClick}>
      {icon}
      {text}
      {textIcon}
    </button>
  )
};