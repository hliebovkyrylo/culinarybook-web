"use client"

import { 
  GearIcon, 
  MoonIcon, 
  ReportIcon, 
  SavedIcon, 
  SunIcon 
}                         from "@/icons";
import { useTheme }       from "next-themes";
import { Cookies }        from "react-cookie";
import { DropMenuButton } from "../DropMenu";

const DropMenu = () => {
  const { theme, setTheme } = useTheme();
  const cookies             = new Cookies();

  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  };

  const onClickSignOut = () => {
    cookies.remove('accessToken');
  };
  
  return (
    <div className="dropmenu">
      <DropMenuButton 
        icon={theme === 'dark' ? <SunIcon className='ml-4 mr-2' /> : <MoonIcon className='ml-4 mr-2' />} 
        text="Change theme" 
        onClick={handleChangeTheme} 
      />
      <DropMenuButton 
        icon={<GearIcon className="dark:fill-white fill-black ml-4 mr-2" />} 
        text="Settings" 
      />
      <DropMenuButton 
        icon={<SavedIcon className="dark:fill-white fill-black ml-4 mr-2" />} 
        text="Saved recipes" 
      />
      <DropMenuButton 
        icon={<ReportIcon className="dark:fill-white fill-black ml-4 mr-2 border-b border-stone-700" />} 
        text="Report a problem" 
      />
      <DropMenuButton 
        text="Logout" 
        onClick={onClickSignOut}
      />
    </div>
  )
}

export default DropMenu;