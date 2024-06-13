"use server";

import * as z from "zod";
import { settingsSchema } from "@/schema";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail, getUserById } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/components/mail";
import { currentUser } from "@/lib/auth";

export const settings = async (values: z.infer<typeof settingsSchema>) => {
    const user = await currentUser();
    if (!user) {
        return { error: "unauthorized" };
    }
    if (!user.id) {
        return { error: "unauthorized" };
    }

    const dbUser = await getUserById(user.id);
    if (!dbUser) {
        return { error: "unauthorized" };
    }

    if (user.isOAuth) { // to disable those fields for OAuth users
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactoredEnabled = undefined;
    }

    if (values.email && values.email !== user.email) { // update email 
        const existingUser = await getUserByEmail(values.email);
        if (existingUser && existingUser.id !== user.id) {
            return { error: "email is already in use" };
        }
        // create a new token to verify that the user
        const verifyToken = await generateVerificationToken(values.email);
        await sendVerificationEmail(verifyToken.email, verifyToken.token);
        return { success: "verification is sent" };
    }

    if (values.password && values.newPassword && dbUser.password) {
        // if the password is correct
        const passwordMatch = await bcrypt.compare(values.password, dbUser.password);
        if (!passwordMatch) {
            return { error: "incorrect password" };
        }
        const hashedPassword = await bcrypt.hash(values.newPassword, 10);
        values.password = hashedPassword;
        values.newPassword = undefined;
    }

    const updateData = {
        ...(values.name && { name: values.name }),
        ...(values.email && { email: values.email }),
        ...(values.password && { password: values.password }),
        ...(values.role && { role: values.role }),
        ...(values.isTwoFactoredEnabled !== undefined && { isTwoFactoredEnabled: values.isTwoFactoredEnabled }), // Correct field name
    };

    try {
        await db.user.update({
            where: { id: dbUser.id },
            // data: updateData,
            data: {
                ...values
            }
        });
        return { success: "data updated" };
    } catch (error) {
        console.error("Error updating user:", error);
        return { error: "failed to update user" };
    }
};
