import { GlassIcon, HomeIcon, AddIcon, UserIcon } from "@/images";

export const sidebarLinks = [
  {
    image   : <HomeIcon className="icon-color" />,
    route   : "/",
    label   : "Home",
  },
  {
    image   : <GlassIcon className="icon-color" />,
    route   : "/search",
    label   : "Search",
  },
  {
    image   : <AddIcon className="icon-color" />,
    route   : "/create-recipe",
    label   : "Create recipe",
  },
  {
    image   : <UserIcon className="icon-color" />,
    route   : "/profile",
    label   : "My profile",
  },
];