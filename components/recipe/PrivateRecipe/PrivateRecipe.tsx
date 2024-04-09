import { LockIcon } from "@/icons"

export const PrivateRecipe = () => {
  return (
    <section className="w-full h-full flex justify-center items-center">
      <LockIcon />
      <div className="text-2xl ">This recipe is private!</div>
    </section>
  )
}