import { useTranslation }      from "next-i18next";
import { useEffect, useState } from "react";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text      : string;
  className?: string;
  state     : "default" | "loading" | "disabled"
  leftIcon ?: React.ReactNode;
}

export const Button = ({
  text,
  className,
  state,
  leftIcon,
  ...props
}: IButton) => {
  const { t } = useTranslation("common");

  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(dots => dots.length < 3 ? '.' + dots : '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <button {...props} disabled={state === "disabled" || state === "loading"} className={`${(state === "disabled" || state === "loading") && "!bg-[#888888]"} flex justify-center items-center dark:bg-bg-c-10 text-black w-full py-2 rounded-lg dark:hover:bg-[#ADAE5E] transition-all bg-[#C77D0A] hover:bg-[#c7750a] font-semibold ${className}`}>
      {leftIcon}
      {state === "loading" ? (
        <div className="relative flex items-center">
          <div className="dark:border-[#575757] mr-1 border-neutral-300 h-4 w-4 animate-spin rounded-full border-4 dark:border-t-[#ffffff] border-t-[#ffffff]" />
          <span>{t('button-loading')}</span>
          <div className="w-3 flex">{dots}</div>
        </div>
      ) : text}
    </button>
  )
};