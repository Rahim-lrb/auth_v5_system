"use server"

import * as z from "zod"
import { loginSchema } from "@/schema"
import { signIn } from "@/auth"
import { defaultLoginRedirect } from "@/route"
import { AuthError } from "next-auth"
import { getUserByEmail } from "@/data/user"

// verification email
import { sendVerificationEmail } from "@/components/mail"

// 2fa
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens"
import { sendTwoFactorTokenEmail } from "@/components/mail"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"
import { db } from "@/lib/db"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"


export const login = async (values: z.infer<typeof loginSchema>, callbackUrl?: string) => { // console here would be logged in the server
    /* if you don't like server actions you could have used axios or fetch directly */ 

    // validation server side using server actions
    const validatedFields = loginSchema.safeParse(values)
    if (!validatedFields.success) {
        return {error: "invalid fields"}
    }
    const { email, password, code } = validatedFields.data;

    //  add verification email 
    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "email does not exist"}
    }

    if (!existingUser?.emailVerified) { // if not verified yet
        const verificationToken = await generateVerificationToken(existingUser.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        return {success: "confirmation email sent"}
    }


    // 2fa if true
    if (existingUser.isTwoFactoredEnabled && existingUser.email) {
        if (code) { // you received a code, so verify it
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
            console.log("verify the 2fa", twoFactorToken)

            if (!twoFactorToken) {
                return { error: "invalid code" }
            }
            if (twoFactorToken.token !== code) {
                return { error: "invalid code" }
            }
            const hasExpired = new Date(twoFactorToken.expires) < new Date()
            if (hasExpired) {
                return { error: "code expired" }
            }
            // remove the 2ft 
            await db.twoFactorToken.delete({
                where: { id: twoFactorToken.id }
            })

            // check if we have an existing confirmation
            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id }
                })
            }
            // 
            await db.twoFactorConfirmation.create({
                data: { userId: existingUser.id}
            })
        } else { // you didn't receive the code
            const twoFactorToken = await generateTwoFactorToken(existingUser.email)
            console.log("generate tfa token , i didn't receive the code", twoFactorToken)
            await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)
            return { twoFactor: true }
        }
    }


    // * we import sign in 
    try {
        await signIn("credentials",{ email, password, redirectTo: callbackUrl || defaultLoginRedirect })
    } catch (e) {
        if (e instanceof AuthError ) {
            switch (e.type) {
                case "CredentialsSignin":
                    return { error: "invalid credentials" }
                default:
                    return { error: "something went wrong" }
            }
        }
        throw e
    }
    
}