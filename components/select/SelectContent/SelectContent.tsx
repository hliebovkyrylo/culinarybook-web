import { PropsWithChildren } from "react"

interface ISelectContent {
  isActive: boolean;
}

export const SelectContent = ({ isActive, children }: PropsWithChildren<ISelectContent>) => {
  return (
    <>
      {isActive && (
        <div className="absolute select-content">
          {children}
        </div>
      )}
    </>
  )
}