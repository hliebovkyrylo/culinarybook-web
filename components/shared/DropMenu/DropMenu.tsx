interface IDropMenu extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const DropMenu = ({ children, className, ...props }: IDropMenu) => {
  return (
    <div className={`dropmenu ${className}`} {...props}>
      {children}
    </div>
  )
}

export default DropMenu;
