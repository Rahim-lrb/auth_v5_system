// @ts-nocheck
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/accounts";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({ 
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") {
                return true;
            }

            const existingUser = await getUserById(user.id!);
            if (!existingUser?.emailVerified) {
                return false; 
            }

            if (existingUser.isTwoFactoredEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
                if (!twoFactorConfirmation) return false;
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id },
                });
            }

            return true;
        },
        async session({ token, session }) {
            if (session.user) {
                // session.user.customField = token.customField;
                session.user.id = token.sub;
                session.user.role = token.role;
                session.user.isTwoFactoredEnabled = token.isTwoFactoredEnabled;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.isOAuth = token.isOAuth;
            }
            return session;
        },
        async jwt({ token }) {
            token.customField = "hey";

            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(existingUser.id);

            token.isOAuth = !!existingAccount;
            token.role = existingUser.role;
            token.isTwoFactoredEnabled = existingUser.isTwoFactoredEnabled;
            token.name = existingUser.name;
            token.email = existingUser.email;

            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});