import Head from "next/head"
import Image from "next/image";
import { Montserrat } from 'next/font/google'
import { MainTopbar } from "./MainTopbar";
import { MainLeftSidebar } from "./MainLeftSidebar";
import { MainBottombar } from "./MainBottombar";
import { Loader } from "@/components/Loader";
import { IUserMe } from "@/typings/user";
import { INotification } from "@/typings/notification";

const montserrat = Montserrat({ subsets: ['latin'] });

interface IMainLayout {
  children: React.ReactNode;
  metaTitle: string;
  pageDescription: string;
  backgroundImage?: string;
  isLoading?: boolean;
  containerSize: 'full' | 'small';
  pageTitle?: string;
  user?: IUserMe;
  notifications?: INotification[];
}

export const MainLayout = ({
  children,
  metaTitle,
  pageDescription,
  backgroundImage,
  isLoading,
  containerSize,
  pageTitle,
  user,
  notifications
}: IMainLayout) => {
  return (
    <div className={montserrat.className}>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <MainTopbar user={user} notifications={notifications} />
      <div className="flex flex-row">
        <MainLeftSidebar user={user} />
        <main className='flex min-h-screen flex-1 flex-col items-center p-5 2xl:p-0 max-2xl:w-screen mx-auto'>
          <div className={`w-full h-full flex flex-col ${containerSize === 'full' ? 'max-w-[1480px]' : 'max-w-[974px]'} mt-24 max-sm:mt-16`}>
            <h1 className='text-black dark:text-neutral-50 font-semibold text-2xl'>{pageTitle}</h1>
            {isLoading ? (
              <Loader className="!-z-10 absolute top-0 left-0 blur-[2px]" />
            ) : backgroundImage && (
              <Image className="absolute w-full h-screen top-0 left-0 object-cover z-[-1] blur-sm opacity-10" src={backgroundImage} alt="Background image" width={500} height={500} />
            )}
            {children}
          </div>
        </main>
      </div>
      <MainBottombar user={user} />
    </div>
  )
}