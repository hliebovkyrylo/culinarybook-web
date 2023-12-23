import Link             from "next/link";
import Image            from "next/image";
import { sidebarLinks } from "@/constants";

const LeftSidebar = () => {
  return (
    <aside className="leftsidebar">
      <div className="flex items-center ml-14 mb-14">
        <Image src={'/assets/icons/burger.svg'} alt="Logo" width={48} height={48}/>
        <span className="text-color-custom-yellow pl-4 text-lg">Recipe book</span>
      </div>
      {sidebarLinks.map((link) => {
        return (
          <Link href={link.route} className="link-button">
            <Image src={link.imageUrl} alt="link image" width={20} height={20} />
            <span className="text-neutral-50 font-medium text-lg ml-2">{link.label}</span>
          </Link>
        )
      })}
    </aside>
  )
};

export default LeftSidebar;