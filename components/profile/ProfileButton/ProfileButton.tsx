import { MouseEventHandler } from "react";

interface IProfileButton {
  text      : string;
  onClick   : MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const ProfileButton = ({
  text,
  onClick, 
  className
}: IProfileButton) => {
  return (
    <button className={`profile-button ${className}`} onClick={onClick}>{text}</button>
  )
}