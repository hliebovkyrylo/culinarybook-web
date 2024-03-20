interface INotificationsLauout {
  title   : string;
  children: React.ReactNode;
}

export const NotificationsLayout = ({
  title,
  children,
}: INotificationsLauout) => {
  return (
    <section className="flex justify-center">
      <div className="w-full max-w-2xl ">
        <h1 className="head-text mb-7">{title}</h1>
        <div className="h-[690px] main-background p-4 overflow-y-auto rounded-xl">
          {children}
        </div>
      </div>
    </section>
  )
}