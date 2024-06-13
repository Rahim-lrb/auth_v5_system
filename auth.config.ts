import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"

import { loginSchema } from "./schema"
import credentials from "next-auth/providers/credentials"
import { getUserByEmail } from "./data/user"
import bcryptjs from "bcryptjs";
import github from "next-auth/providers/github"
import google from "next-auth/providers/google"


// Notice this is only an object, not a full Auth.js instance


// * we do this instead for validating the email if used, 
export default {
    providers: [ github({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }), google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
        credentials({
        async authorize(credentials) {
            const validatedFields = loginSchema.safeParse(credentials)

            if (validatedFields.success) {
                const { email , password } = validatedFields.data;

                // we check if the email is connected to any user in the db
                const user = await getUserByEmail(email)
                if (!user || !user.password) return null
                const passwordMatch = await bcryptjs.compare(password, user.password)
                if (passwordMatch) return user;
            }
            return null;
        }
    }) ],
} satisfies NextAuthConfig