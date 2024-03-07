"use client"

import Image        from "next/image";
import Link         from "next/link";
import DropMenu     from "@/components/shared/DropMenu";
import { useState } from "react";
import { useTheme } from "next-themes";
import { LogoIcon } from "@/icons";

const Topbar = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const onClickOpenMenu = () => {
    setIsVisible(!isVisible);
  };

  return (
    <nav className="topbar">
      <div className="flex justify-between w-full">
        <span className="max-lg:hidden"/>
        <Link href={'/'}>
          <div className="flex items-center lg:hidden">
          <LogoIcon className="icon-color"/>
          <span className={"pl-4 text-lg link-text"}>Recipe book</span>
          </div>
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
        {isVisible && (
          <DropMenu />
        )}
      </div>
    </nav>
  )
};

export default Topbar;