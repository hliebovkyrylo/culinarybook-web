export const ContentMain = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className="overflow-x-auto">
      <div className={`grid ${className} w-width-1480`}>
        {children}
      </div>
    </div>
  )
};
