import { Button } from "@/components/ui";
import { useTranslation } from "next-i18next";

interface IDialog {
  confirmText: string;
  buttonText: string;
  clickAction: () => void;
  closeConfirm: () => void;
}

export const Dialog = ({
  confirmText,
  clickAction,
  closeConfirm,
  buttonText,
}: IDialog) => {
  const { t } = useTranslation("common");

  const handleOutsideClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    closeConfirm();
  };

  const handleInsideClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };
  return (
    <div
      className="flex justify-center items-center fixed top-0 right-0 w-full h-screen settings-background z-[600]"
      onClick={handleOutsideClick}
    >
      <div
        className="w-96 h-32 flex flex-col justify-between main-background rounded-xl py-6 px-4"
        onClick={handleInsideClick}
      >
        <p className="text-sm text-[#b6b6b6]">{confirmText}</p>
        <div className="flex justify-end">
          <button type="button" onClick={closeConfirm} className="mr-4">
            {t("canclel-button")}
          </button>
          <Button
            type="button"
            onClick={clickAction}
            className="!w-40 h-8 flex items-center justify-center"
            state="default"
            text={buttonText}
          />
        </div>
      </div>
    </div>
  );
};
