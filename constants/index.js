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
    image: <HomeIcon className="icon-color" />,
    route: "/",
    label: "title",
  },
  {
    image: <GlassIcon className="icon-color" />,
    route: "/search",
    label: "search",
  },
  {
    image: <AddIcon className="icon-color" />,
    route: "/create-recipe",
    label: "create-recipe",
  },
  {
    image: <UserIcon className="icon-color" />,
    route: "/profile",
    label: "profile",
  },
];

export const profileLinks = [
  {
    icon: <FileIcon className="fill-[#666] w-6" />,
    route: "/profile",
    label: "recipe-button",
  },
  {
    icon: <Bookmark className="fill-[#666] w-4" />,
    route: "/profile/saved",
    label: "saved-button",
  },
  {
    icon: <HeartSolidIcon className="fill-[#666] w-6" />,
    route: "/profile/liked",
    label: "liked-button",
  },
]