"use client"

import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "../ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { FaUser } from "react-icons/fa"
import { ExitIcon } from "@radix-ui/react-icons"

import { useCurrentUser } from "@/hooks/use-current-user"
import { LogoutButton } from "./logout-button"


export const UserButton = () => {
    const user = useCurrentUser()
    console.log("hey")
    console.log(user)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""}></AvatarImage>
                    <AvatarFallback className="bg-sky-500"> <FaUser className="text-white"/> </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <LogoutButton>
                    <DropdownMenuItem>
                        <ExitIcon className="h-4 w-4 mr-2"/>
                        logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
