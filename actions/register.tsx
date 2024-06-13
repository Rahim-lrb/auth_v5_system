"use server"

import * as z from "zod"
import { RegisterSchema } from "@/schema"
import bcrypt from "bcrypt"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/components/mail"

/*
if you don't like server actions you could have used axios or fetch directly
*/ 


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    console.log("server action") // this would be logged on the server
    // validation server side
    const validatedFields = RegisterSchema.safeParse(values)
    if (!validatedFields.success) {
        return {error: "invalid fields"}
    }

    const { data } = validatedFields; // Access the parsed data
    const { email, password, name } = data;

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // const existingUser = await db.user.findUnique({ where: {
    //     email,
    // } })
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "email already in use"}
    }
    await db.user.create({ data: {email, password:hashedPassword, name } })


    
    // todo send verification token email
    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { success: "confirmation email sent"}


    // return { success: "user created"}
}