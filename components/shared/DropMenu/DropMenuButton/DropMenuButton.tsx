import { ReactNode } from "react";

interface DropMenuProps {
  onClick  ?: () => void
  icon     ?: ReactNode;
  text      : string
  className?: string;
};

export const DropMenuButton = ({
  onClick,
  icon,
  text,
  className
}: DropMenuProps) => {
  return (
    <button className={`dropmenu__button ${className}`} onClick={onClick}>
      {icon}
      {text}
    </button>
  )
};