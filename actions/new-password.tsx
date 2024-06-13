"use server"

import { newPasswordSchema } from "@/schema"
import { getUserByEmail } from "@/data/user"
import * as z from "zod"
import bcrypt from "bcrypt"


import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { db } from "@/lib/db"


export const newPassword = async (values: z.infer<typeof newPasswordSchema>, token?: string | null) => {
    if (!token) return { error: "missing token"}

    const validatedFields = newPasswordSchema.safeParse(values)
    if (!validatedFields.success) {
        return {error: "invalid fields"}
    }
    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);
    console.log(existingToken) // null
    console.log("existing token")

    if (!existingToken) {
        return { error: "invalid token"}
    }
    const hasExpired = new Date(existingToken.expires) < new Date()
    if (hasExpired) {
        return { error: "token expired"}
    }
    console.log("expiration")
    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) {
        return { error: "user not found"}
    }
    console.log("existing user")

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword }
    })

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: { id: existingToken.id }
        })
    }

    return { success: "password updated" }
}