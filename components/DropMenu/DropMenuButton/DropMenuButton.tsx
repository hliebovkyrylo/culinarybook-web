import { ReactNode } from "react";

interface DropMenuProps {
  onClick?: () => void
  icon   ?: ReactNode;
  text    : string
};

export const DropMenuButton = ({
  onClick,
  icon,
  text,
}: DropMenuProps) => {
  return (
    <button className="dropmenu__button" onClick={onClick}>
      {icon}
      {text}
    </button>
  )
};