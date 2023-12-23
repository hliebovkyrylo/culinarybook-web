import { sidebarLinks } from "@/constants";
import Link             from "next/link";
import Image            from "next/image";

const Bottombar = () => {
  return (
    <section className="bottombar">
      {sidebarLinks.map((link) => {
        return (
          <Link href={link.route} className="bottombar__link">
            <Image src={link.imageUrl} alt="Link" width={20} height={20} />
            <span className="max-sm:hidden text-white mt-1">{link.label}</span>
          </Link>
        )
      })}
    </section>
  )
};

export default Bottombar;