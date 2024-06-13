"use server"

import { currentRole } from "@/lib/auth"
import { userRole } from "@prisma/client"

export const admin = async () => {
    const role = await currentRole()
    if (role === userRole.ADMIN) {
        return { success: "allowed server action"}
    }
    return { error: 'forbidden server action'}
}