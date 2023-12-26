"use client"

import Image        from "next/image";
import Link         from "next/link";
import DropMenu     from "@/components/shared/DropMenu";
import { useState } from "react";
import { useTheme } from "next-themes";

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
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M5.72812 21C4.21875 21 3 19.7812 3 18.2719C3 18.0937 3.01875 17.925 3.05625 17.7469C3.55312 15.7781 7.3875 3 24 3C40.6125 3 44.4469 15.7781 44.9437 17.7469C44.9906 17.925 45 18.0937 45 18.2719C45 19.7812 43.7812 21 42.2719 21H5.72812ZM13.5 12C13.5 11.6022 13.342 11.2206 13.0607 10.9393C12.7794 10.658 12.3978 10.5 12 10.5C11.6022 10.5 11.2206 10.658 10.9393 10.9393C10.658 11.2206 10.5 11.6022 10.5 12C10.5 12.3978 10.658 12.7794 10.9393 13.0607C11.2206 13.342 11.6022 13.5 12 13.5C12.3978 13.5 12.7794 13.342 13.0607 13.0607C13.342 12.7794 13.5 12.3978 13.5 12ZM36 13.5C36.3978 13.5 36.7794 13.342 37.0607 13.0607C37.342 12.7794 37.5 12.3978 37.5 12C37.5 11.6022 37.342 11.2206 37.0607 10.9393C36.7794 10.658 36.3978 10.5 36 10.5C35.6022 10.5 35.2206 10.658 34.9393 10.9393C34.658 11.2206 34.5 11.6022 34.5 12C34.5 12.3978 34.658 12.7794 34.9393 13.0607C35.2206 13.342 35.6022 13.5 36 13.5ZM25.5 9C25.5 8.60218 25.342 8.22064 25.0607 7.93934C24.7794 7.65804 24.3978 7.5 24 7.5C23.6022 7.5 23.2206 7.65804 22.9393 7.93934C22.658 8.22064 22.5 8.60218 22.5 9C22.5 9.39782 22.658 9.77936 22.9393 10.0607C23.2206 10.342 23.6022 10.5 24 10.5C24.3978 10.5 24.7794 10.342 25.0607 10.0607C25.342 9.77936 25.5 9.39782 25.5 9ZM1.5 28.5C1.5 26.0156 3.51562 24 6 24H42C44.4844 24 46.5 26.0156 46.5 28.5C46.5 30.9844 44.4844 33 42 33H6C3.51562 33 1.5 30.9844 1.5 28.5ZM3 37.5C3 36.675 3.675 36 4.5 36H43.5C44.325 36 45 36.675 45 37.5V39C45 42.3094 42.3094 45 39 45H9C5.69063 45 3 42.3094 3 39V37.5Z" fill={theme ==="dark" ? "#DDDF72" : "#C77D0A"}/>
          </svg>
            <span className={`pl-4 text-lg ${theme ==="dark" ? "text-color-custom-yellow" : "text-color-orange"}`}>Recipe book</span>
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