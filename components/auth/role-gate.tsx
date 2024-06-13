"use client"
import { useCurrentRole } from "@/hooks/use-current-role"
import { userRole } from "@prisma/client"
import { FormError } from "../form-error"


interface RoleGateProps {
    children: React.ReactNode,
    allowedRole: userRole
}


export const RoleGate = ( { children, allowedRole }: RoleGateProps ) => {
    const role = useCurrentRole()
    if (role !== allowedRole) {
        return (
            <FormError message="you do not have the permission to see this content"></FormError>
        )
    }
    return (
        <>
            {children}
        </>
    )
}