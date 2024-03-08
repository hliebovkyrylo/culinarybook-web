export const ContentMain = (props: { children: React.ReactNode }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between w-width-1480">
        {props.children}
      </div>
    </div>
  )
};
