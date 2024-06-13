"use client"
import { useRouter } from "next/navigation"
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog"
import { LoginForm } from "./login-form"

interface loginBtn {
    children: React.ReactNode,
    mode?: "model" | "redirect",
    asChild?: boolean,
}


export const LoginButton = ({children, mode= "redirect", asChild }: loginBtn) => {
  const router = useRouter()

  const onclick = () => { 
    console.log("button clicked")
    router.push("/auth/login")
  }
  if (mode == "model") {
    return (
      // <span onClick={onclick} className="cursor-pointer">implement model</span>
      <Dialog>
        <DialogTrigger asChild={asChild}>
          {children}
        </DialogTrigger>
        <DialogContent className="p-0 bg-transparent w-auto border-none">
          <LoginForm></LoginForm>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <span onClick={onclick} className="cursor-pointer">{children}</span>
  )
}
