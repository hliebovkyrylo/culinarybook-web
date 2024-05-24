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
}                                           from "@/icons";
import Image                                from "next/image";
import Link                                 from "next/link";
import { useEffect, useState }              from "react";
import { Button }                           from "@/components/ui";
import { useTheme }                         from "next-themes";
import { useTranslation }                   from "next-i18next";
import { useSignOutMutation }               from "@/lib/api/authApi";
import { useGetMeQuery }                    from "@/lib/api/userApi";
import { io }                               from "socket.io-client";
import { baseUrl }                          from "@/lib/api";
import { DropMenuButton, Loader, Settings } from "@/components/shared";
import DropMenu                             from "@/components/shared/DropMenu/DropMenu";
import { useRouter }                        from "next/router";

export const MainTopbar = () => {
  const { t, i18n } = useTranslation('common');

  const router = useRouter();
  const pathname = router.pathname;

  const { data: user, isLoading } = useGetMeQuery();

  const [ signOut, { isLoading: isLoadingSignOut, isSuccess } ] = useSignOutMutation();
  
  const [isVisible, setIsVisible]               = useState<boolean>(false);
  const [isOpenedSettings, setIsOpenedSettings] = useState<boolean>(false);

  const [isVisibleLanguage, setIsVisibleLanguage] = useState<boolean>(false);

  const { theme, setTheme } = useTheme();

  const [ unreadedNotificationsCount, setUnreadedNotificaionsCount ] = useState<number>(0);

  useEffect(() => {
    const socket = io(baseUrl, {
      withCredentials: true,
    });

    if (user) {
      socket.emit('userConnect', user.id); 
      socket.emit('getUnreadedNotifications', user.id);

      socket.on('unreadedNotifications', (unreadedNotifications) => {
        setUnreadedNotificaionsCount(unreadedNotifications);
      });

      socket.on("notification", () => {
        setUnreadedNotificaionsCount(unreadedNotificationsCount + 1);
      });

      socket.on('removeNotification', () => {
        setUnreadedNotificaionsCount(unreadedNotificationsCount - 1);
      });
    }
  }, [user])

  useEffect(() => {
    if (pathname === '/notifications') {
      setUnreadedNotificaionsCount(0);
    }
  }, [pathname]);

  const onClickOpenMenu = () => {
    setIsVisible(!isVisible);
    setIsVisibleLanguage(false);
  };

  const userId  = user?.id;

  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  };

  const onClickSignOut = () => {
    setIsVisible(false);
    signOut().unwrap().then(() => {
      window.location.reload();
    }).catch((error) => {
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

  const handleOutsideClick = () => {
    setIsVisible(false);
    setIsVisibleLanguage(false);
  };

  const handleInsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    router.push(router.pathname, router.asPath, { locale: lng });
  };

  if (isLoading || isLoadingSignOut || isSuccess) {
    return <Loader className="absolute left-0 top-0 z-[100]" />
  }

  return (
    <>
      {isOpenedSettings && (
        <Settings closeSettings={() => setIsOpenedSettings(false)} />
      )}
      <nav className="topbar" onClick={handleOutsideClick}>
        <div className="flex justify-between w-full items-center">
          <span className="max-lg:hidden"/>
          <Link href={'/'} className="main-logo lg:hidden">
            <div className="flex items-center">
              <LogoIcon className="icon-color"/>
              <span className={"pl-4 text-lg link-text max-sm:hidden"}>Culinarybook</span>
            </div>
          </Link>
          {user ? (
            <div className="flex items-center">
              <Link href={'/notifications'} className="mr-6 fill-[#6b6b6b] hover:fill-[#808080] transition-all relative">
                <BellIcon className="w-6" />
                {unreadedNotificationsCount > 0 && (
                  <>
                    <span className="block absolute top-[3px] right-[-1px] rounded-full w-3 h-3 bg-red-600 animate-ping" />
                    <span className="block absolute top-[3px] text-white right-[-1px] rounded-full text-xs text-center w-3 h-3 bg-red-600">{unreadedNotificationsCount > 10 ? "9+" : unreadedNotificationsCount}</span>
                  </>
                )}
              </Link>
              <div className="flex items-center" onClick={handleInsideClick}>
                <button onClick={onClickOpenMenu}>
                  <Image 
                    src={user && user.image !== '' ? user.image : '/assets/defaulUserImage.jpg'} 
                    alt="User photo"
                    width={32}
                    className="object-cover w-8 h-8 rounded-full"
                    height={32}
                  />
                </button>
              </div>
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
            <DropMenu className="w-[242px] max-[413px]:w-[230px] max-[413px]:!-right-0" onClick={handleInsideClick}>
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
                      textIcon={i18n.language === 'en' && <CheckIcon className="w-4 fill-[#555555]" />}
                      onClick={() => changeLanguage('en')} 
                      className="px-3 justify-between"
                    />
                    <DropMenuButton 
                      text={'Українська'}
                      textIcon={i18n.language === 'uk' && <CheckIcon className="w-4 fill-[#555555]" />}
                      onClick={() => changeLanguage('uk')} 
                      className="px-3 justify-between"
                    />
                    <DropMenuButton 
                      text={'Русский'}
                      textIcon={i18n.language === 'ru' && <CheckIcon className="w-4 fill-[#555555]" />}
                      onClick={() => changeLanguage('ru')} 
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