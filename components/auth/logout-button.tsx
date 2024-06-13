"use client"
import { signOut } from "next-auth/react"



interface logoutBtn {
    children?: React.ReactNode,
}


export const LogoutButton = ({ children }: logoutBtn) => {

  const onclick = () => { 
    signOut();
  }

  return (
    <span onClick={onclick} className="cursor-pointer">{children}</span>
  )
}
