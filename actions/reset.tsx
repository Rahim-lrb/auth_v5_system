"use server"

import { resetSchema } from "@/schema"
import { getUserByEmail } from "@/data/user"
import * as z from "zod"
import { sendVerificationPassword } from "@/components/mail"
import { generateResetPasswordToken } from "@/lib/tokens"



export const reset = async (values: z.infer<typeof resetSchema>) => {
    const validatedFields = resetSchema.safeParse(values)
    if (!validatedFields.success) {
        return {error: "invalid fields"}
    }
    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return { error: "email not found"}
    }


    // generate a token
    const passwordToken = await generateResetPasswordToken(email)
    await sendVerificationPassword(passwordToken.email, passwordToken.token)

    return { success: "reset email sent"}

}