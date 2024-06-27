import {
  BellIcon,
  CheckIcon,
  EarthIcon,
  GearIcon,
  LogoIcon,
  MoonIcon,
  SavedIcon,
  SunIcon
}                              from "@/icons";
import { 
  Button, 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuPortal, 
  DropdownMenuSub, 
  DropdownMenuSubContent, 
  DropdownMenuSubTrigger, 
  DropdownMenuTrigger 
}                              from "@/components/ui";
import Image                   from "next/image";
import Link                    from "next/link";
import { useTheme }            from "next-themes";
import { useTranslation }      from "next-i18next";
import { useSignOutMutation }  from "@/lib/api/authApi";
import { useGetMeQuery }       from "@/lib/api/userApi";
import { useRouter }           from "next/router";
import { Loader }              from "@/components/Loader";
import { useGetMyAllUnreadedNotificationsQuery } from "@/lib/api/notificationApi";

export const MainTopbar = () => {
  const { t, i18n } = useTranslation('common');

  const router   = useRouter();

  const { data: user, isLoading } = useGetMeQuery();
  const { data: notifications, isLoading: isLoadingNotifications } = useGetMyAllUnreadedNotificationsQuery();

  const [signOut, { isLoading: isLoadingSignOut, isSuccess }] = useSignOutMutation();

  const { theme, setTheme } = useTheme();

  const userId = user?.id;

  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  };

  const onClickSignOut = () => {
    signOut().unwrap().then(() => {
      window.location.reload();
    })
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    router.push(router.pathname, router.asPath, { locale: lng });
  };

  if (isLoading || isLoadingSignOut || isSuccess || isLoadingNotifications) {
    return <Loader className="absolute left-0 top-0 z-[100]" />
  }

  return (
    <header className="topbar">
      <nav className="flex justify-between w-full items-center">
        <span className="max-lg:hidden" />
        <Link href={'/'} className="main-logo lg:hidden">
          <div className="flex items-center">
            <LogoIcon className="icon-color" />
            <span className={"pl-4 text-lg link-text max-sm:hidden"}>Culinarybook <b className="dark:text-white text-black">beta</b></span>
          </div>
        </Link>
        {user ? (
          <div className="flex items-center gap-6">
            <Link href={'/notifications'} className="fill-[#6b6b6b] hover:fill-[#808080] transition-all relative">
              <BellIcon className="w-6" />
              {notifications && notifications.length > 0 && (
                <>
                  <span className="block absolute top-[3px] right-[-1px] rounded-full w-3 h-3 bg-red-600 animate-ping" />
                  <span className="block absolute top-[3px] text-white right-[-1px] rounded-full text-xs text-center w-3 h-3 bg-red-600">{notifications.length > 10 ? "9+" : 1}</span>
                </>
              )}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer" asChild>
                <Image
                  src={user && user.image !== '' ? user.image : '/assets/defaulUserImage.jpg'}
                  alt="User photo"
                  width={32}
                  className="object-cover w-8 h-8 rounded-full"
                  height={32}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={handleChangeTheme} className={`${theme === 'light' && 'gap-1'}`}>
                  {theme === 'light' 
                    ? <MoonIcon /> 
                    : <SunIcon />
                  } 
                  {t('theme')}
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="gap-1"><EarthIcon className="w-4 dark:fill-white fill-black" />{t('change-language')}</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-40">
                      <DropdownMenuItem onClick={() => changeLanguage('en')} className="flex justify-between">
                        English{i18n.language === 'en' && <CheckIcon className="w-4 fill-[#555555]" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => changeLanguage('uk')} className="flex justify-between">
                        Українська{i18n.language === 'uk' && <CheckIcon className="w-4 fill-[#555555]" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => changeLanguage('ru')} className="flex justify-between">
                        Русский{i18n.language === 'ru' && <CheckIcon className="w-4 fill-[#555555]" />}
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <Link href={'/settings'} className="flex items-center w-full gap-1">
                    <GearIcon className="dark:fill-white fill-black" />
                    {t('settings')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/profile/${userId}/saved`} className="flex items-center w-full gap-1">
                    <SavedIcon className="dark:fill-white fill-black" />
                    {t('saved')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onClickSignOut}>{t('logout')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              <Button text={t('title-signin')} state="default" className="h-9" />
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
};