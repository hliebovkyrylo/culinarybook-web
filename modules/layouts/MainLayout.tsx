import Head                from "next/head"
import { MainBottombar }   from "./components/MainBottombar"
import { MainLeftSidebar } from "./components/MainLeftSidebar"
import { MainTopbar }      from "./components/MainTopbar"
import { Loader }          from "@/components/shared";
import Image               from "next/image";

interface IMainLayout {
  children        : React.ReactNode;
  pageTitle       : string;
  pageDescription : string;
  backgroundImage?: string;
  isLoading      ?: boolean;
}

export const MainLayout = ({
  children,
  pageTitle,
  pageDescription,
  backgroundImage,
  isLoading
}: IMainLayout) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <MainTopbar />
      <div className="flex flex-row">
        <MainLeftSidebar />
        <main className='flex min-h-screen flex-1 flex-col items-center p-5 2xl:p-0 max-2xl:w-screen mx-auto'>
          <div className='w-full max-w-[1480px] flex h-full mt-24 max-sm:mt-16'>
            {isLoading ? (
              <Loader className="!-z-10 absolute top-0 left-0 blur-[2px]" />
            ) : backgroundImage && (
              <Image className="absolute w-full h-screen top-0 left-0 object-cover z-[-1] blur-sm opacity-10" src={backgroundImage} alt="Background image" width={500} height={500} />
            )}
            {children}
          </div>
        </main>
      </div>
      <MainBottombar />
    </>
  )
}