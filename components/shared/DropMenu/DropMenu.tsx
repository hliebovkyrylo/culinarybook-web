"use client"

const DropMenu = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`dropmenu ${className}`}>
      {children}
    </div>
  )
}

export default DropMenu;