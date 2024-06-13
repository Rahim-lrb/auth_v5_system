"use client"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Header } from "./header"
import { Social } from "@/components/auth/social"
import { BackButton } from "./back-button"


interface CardWrapperProps {
    children: React.ReactNode,
    headerLabel: string,
    backButtonLabel: string,
    backButtonHref: string, 
    showSocial?: boolean
}

export const CardWrapper = ( { children, headerLabel, backButtonHref, backButtonLabel, showSocial }:CardWrapperProps ) => {

    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel}></Header>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social></Social>
                </CardFooter>
            )}
            <CardFooter>
                <BackButton href={backButtonHref} label={backButtonLabel}></BackButton>
            </CardFooter>
        </Card>
    )
}
