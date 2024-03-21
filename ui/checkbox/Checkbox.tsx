import { useState } from "react"

interface ICheckbox {
  isChecked: boolean;
  onClick ?: () => void;
}

export const Checkbox = ({
  isChecked,
  onClick,
}: ICheckbox) => {
  return (
    <button className="checkbox-bg" onClick={onClick}>
      <span className={`checkbox-item ${isChecked && "checkbox-item-checked "}`} />
    </button>
  )
}