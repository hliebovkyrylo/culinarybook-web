"use client"

import { 
  BellIcon, 
  CheckIcon, 
  ChevronRightIcon, 
  EarthIcon, 
  GearIcon, 
  LogoIcon, 
  MoonIcon, 
  SavedIcon, 
  SunIcon 
}                                   from "@/icons";
import Image                        from "next/image";
import Link                         from "next/link";
import { useState }                 from "react";
import DropMenu                     from "../../DropMenu/DropMenu";
import { Button }                   from "@/ui";
import { useTheme }                 from "next-themes";
import { DropMenuButton, Settings } from "../..";
import { useTranslation }           from "react-i18next";
import i18next                      from "i18next";
import { useSignOutMutation }       from "@/lib/api/authApi";

export const Topbar = () => {
  const { t }   = useTranslation();

  const [ signOut ] = useSignOutMutation();

  const userId  = '3489hg33934hujgg'; 

  const [isVisible, setIsVisible]               = useState<boolean>(false);
  const [isOpenedSettings, setIsOpenedSettings] = useState<boolean>(false);

  const [isVisibleLanguage, setIsVisibleLanguage] = useState<boolean>(false);

  const { theme, setTheme } = useTheme();

  const onClickOpenMenu = () => {
    setIsVisible(!isVisible);
    setIsVisibleLanguage(false);
  };

  const isAuth              = true;
  const isUnread            = true;
  const notificationsNumber = 2;

  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  };

  const onClickSignOut = () => {
    setIsVisible(false);
    signOut().unwrap().catch((error) => {
      console.log(error)
    });
  };

  const onClickOpenSettings = () => {
    setIsOpenedSettings(true);
    setIsVisible(false)
  };

  const handleLanguage = () => {
    setIsVisibleLanguage(!isVisibleLanguage);
  }

  return (
    <>
      {isOpenedSettings && (
        <Settings closeSettings={() => setIsOpenedSettings(false)} />
      )}
      <nav className="topbar">
        <div className="flex justify-between w-full items-center">
          <span className="max-lg:hidden"/>
          <Link href={'/'}>
            <div className="flex items-center lg:hidden">
              <LogoIcon className="icon-color"/>
              <span className={"pl-4 text-lg link-text max-sm:hidden"}>Recipebook</span>
            </div>
          </Link>
          {isAuth ? (
            <div className="flex items-center">
              <Link href={'/notifications'} className="mr-6 fill-[#6b6b6b] hover:fill-[#808080] transition-all relative">
                <BellIcon className="w-6" />
                {isUnread && (
                  <>
                    <span className="block absolute top-[3px] right-[-1px] rounded-full w-3 h-3 bg-red-600 animate-ping" />
                    <span className="block absolute top-[3px] text-white right-[-1px] rounded-full text-xs text-center w-3 h-3 bg-red-600">{notificationsNumber > 10 ? "9+" : notificationsNumber}</span>
                  </>
                )}
              </Link>
              <button onClick={onClickOpenMenu}>
                <Image 
                  src={"/assets/testuserimage.jpg"} 
                  alt="User photo"
                  width={32}
                  className="object-cover w-8 h-8 rounded-full"
                  height={32}
                />
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <button type="button" onClick={handleChangeTheme} className="mr-6">
                {theme === "light" 
                ? <MoonIcon />
                : <SunIcon /> 
                }
              </button>
              <Link href={'/sign-in'} className="w-[160px]">
                <Button text={t('title-signin')} isActive={true} className="h-9" />
              </Link>
            </div>
          )}
          {isVisible && (
            <DropMenu className="w-[242px]">
              <DropMenuButton 
                icon={theme === 'light' ? <MoonIcon className='mr-2' /> : <SunIcon className='mr-1 ' /> } 
                text={t('theme')}
                onClick={handleChangeTheme} 
                className="pl-3"
              />
              <div className="relative">
                <DropMenuButton 
                  icon={<EarthIcon className="w-4 mr-2 dark:fill-white fill-black" />} 
                  text={t('change-language')}
                  textIcon={<ChevronRightIcon className="w-3 fill-[#555555] ml-4" />}
                  onClick={handleLanguage} 
                  className="pl-3"
                />
                {isVisibleLanguage && (
                  <DropMenu className="w-40 !-left-40 !-top-2">
                    <DropMenuButton 
                      text={'English'}
                      textIcon={i18next.language === 'en' && <CheckIcon className="w-4 fill-[#555555]" />}
                      onClick={() => i18next.changeLanguage('en')} 
                      className="px-3 justify-between"
                    />
                    <DropMenuButton 
                      text={'Українська'}
                      textIcon={i18next.language === 'uk' && <CheckIcon className="w-4 fill-[#555555]" />}
                      onClick={() => i18next.changeLanguage('uk')} 
                      className="px-3 justify-between"
                    />
                    <DropMenuButton 
                      text={'Русский'}
                      textIcon={i18next.language === 'ru' && <CheckIcon className="w-4 fill-[#555555]" />}
                      onClick={() => i18next.changeLanguage('ru')} 
                      className="px-3 justify-between"
                    />
                  </DropMenu>
                )}
              </div>
              <DropMenuButton 
                icon={<GearIcon className="dark:fill-white fill-black mr-2" />} 
                text={t('settings')}
                className="pl-[13px]"
                onClick={onClickOpenSettings}
              />
              <Link href={`/profile/${userId}/saved`}>
                <DropMenuButton 
                  icon={<SavedIcon className="dark:fill-white fill-black mr-2" />} 
                  text={t('saved')}
                  className="pl-4"
                  onClick={() => setIsVisible(false)}
                />
              </Link>
              <DropMenuButton 
                text={t('logout')} 
                onClick={onClickSignOut}
                className="pl-4"
              />
            </DropMenu>
          )}
        </div>
      </nav>
    </>
  )
};