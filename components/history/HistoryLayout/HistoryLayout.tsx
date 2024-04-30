export const HistoryLayout = ({ children, title }: { children: React.ReactNode, title: string }) => {
  return (
    <div className="w-full mb-8 max-2xl:!mb-24 max-sm:!mb-16 relative max-w-[974px] mx-auto">
      <div>
        <h1 className="head-text">{title}</h1>
        {children}
      </div>
    </div>
  )
}