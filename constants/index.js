import { 
  GlassIcon, 
  HomeIcon, 
  AddIcon, 
  UserIcon, 
  FileIcon, 
  HeartSolidIcon, 
  Bookmark 
} from "@/icons";

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

export const profileLinks = [
  {
    icon    : <FileIcon className="fill-[#666] w-4" />,
    route   : "/profile",
    label   : "Recipes",
  },
  {
    icon    : <Bookmark className="fill-[#666] w-4 mr-1"  />,
    route   : "/profile/saved",
    label   : "Saved",
  },
  {
    icon    : <HeartSolidIcon className="fill-[#666]" />,
    route   : "/profile/liked",
    label   : "Liked",
  },
]