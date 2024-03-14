export const SearchLayout = ({ children, title }: { children: React.ReactNode, title: string }) => {
  return (
    <div className="w-full max-w-[974px] mx-auto">
      <div>
        <h1 className="head-text">{title}</h1>
        {children}
      </div>
    </div>
  )
}