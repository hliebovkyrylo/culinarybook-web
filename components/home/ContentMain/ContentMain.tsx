export const ContentMain = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div>
      <div className={`${className}`}>
        {children}
      </div>
    </div>
  )
};
