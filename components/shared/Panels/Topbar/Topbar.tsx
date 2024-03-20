"use client"

import { 
  BellIcon, 
  GearIcon, 
  LogoIcon, 
  MoonIcon, 
  SavedIcon, 
  SunIcon 
}                              from "@/icons";
import Image                   from "next/image";
import Link                    from "next/link";
import { useEffect, useState } from "react";
import DropMenu                from "../../DropMenu/DropMenu";
import Button                  from "@/ui/button/Button";
import { useTheme }            from "next-themes";
import { DropMenuButton }      from "../..";
import { Cookies }             from "react-cookie";

export const Topbar = () => {
  const userId = '3489hg33934hujgg';

  const [isVisible, setIsVisible] = useState(false);
  const { theme, setTheme }       = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  const isAuth = true;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted && !isAuth) {
    return null;
  }

  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  };

  const onClickOpenMenu = () => {
    setIsVisible(!isVisible);
  };

  const cookies = new Cookies();

  const onClickSignOut = () => {
    cookies.remove('accessToken');
  };

  const isUnread            = true;
  const notificationsNumber = 2;

  return (
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
              {theme === "dark" 
              ? <SunIcon />
              : <MoonIcon />
              }
            </button>
            <Link href={'/sign-in'} className="w-[160px]">
              <Button text="Sign in" isActive={true} className="h-9" />
            </Link>
          </div>
        )}
        {isVisible && (
          <DropMenu>
            <DropMenuButton 
              icon={theme === 'dark' ? <SunIcon className='mr-1 ' /> : <MoonIcon className='mr-2' />} 
              text="Change theme" 
              onClick={handleChangeTheme} 
              className="pl-3"
            />
            <DropMenuButton 
              icon={<GearIcon className="dark:fill-white fill-black mr-2" />} 
              text="Settings" 
              className="pl-[13px]"
            />
            <Link href={`/profile/${userId}/saved`}>
              <DropMenuButton 
                icon={<SavedIcon className="dark:fill-white fill-black mr-2" />} 
                text="Saved recipes" 
                className="pl-4"
              />
            </Link>
            <DropMenuButton 
              text="Logout" 
              onClick={onClickSignOut}
              className="pl-4"
            />
          </DropMenu>
        )}
      </div>
    </nav>
  )
};