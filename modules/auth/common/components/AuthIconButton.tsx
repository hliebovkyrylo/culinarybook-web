interface IAuthIconButton {
  firstIcon : React.ReactNode;
  secondIcon: React.ReactNode;
  inputType : string;
  onClick   : () => void
};

export const AuthIconButton = ({
  firstIcon,
  secondIcon,
  inputType,
  onClick,
}: IAuthIconButton) => {
  return (
    <button className="absolute right-4 top-4" type="button" onClick={onClick}>
      {inputType === "password" ? (
        firstIcon
      ) : (
        secondIcon
      )}
    </button>
  )
};