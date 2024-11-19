interface ISettingsWindow {
  children: React.ReactNode;
  closeSettings: () => void;
}

export const SettingsWindow = ({
  children,
  closeSettings,
}: ISettingsWindow) => {
  const handleOutsideClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    closeSettings();
  };

  const handleInsideClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };
  return (
    <div
      className="flex px-2 justify-center items-center fixed top-0 left-0 w-full h-screen settings-background z-[60]"
      onClick={handleOutsideClick}
    >
      <section
        className="w-full max-w-[600px] h-[635px] p-6 rounded-xl main-background"
        onClick={handleInsideClick}
      >
        {children}
      </section>
    </div>
  );
};
