import { LockIcon } from "@/icons"

export const PrivateAccount = () => {
  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="flex">
        <LockIcon />
        <div>This account is private!</div>
      </div>
    </section>
  )
}