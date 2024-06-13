"use client"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Button } from "../ui/button"
import { signIn } from "next-auth/react"
import { defaultLoginRedirect } from "@/route"



export const Social = () => {
    const onClick = (provider: "google" | "github") => { 
        signIn(provider, {
            callbackUrl: defaultLoginRedirect,
        })
    }

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("google") }>
                <FcGoogle className="h-5 w-5"></FcGoogle>
            </Button>

            <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("github") }>
                <FaGithub className="h-5 w-5"></FaGithub>
            </Button>
        </div>
    )
}
