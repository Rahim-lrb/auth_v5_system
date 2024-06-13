// @ts-nocheck
import { db } from "@/lib/db";

export const getTwoFactorConfirmationByToken = async (userId: string) => {
    try {
        const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
            where: { userId }
        })
        return twoFactorConfirmation;
    } catch (e) {
        return null;
    }
}


export const getTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        const twoFactorConfirmation = await db.twoFactorConfirmation.findFirst({
            where: { userId }
        })
        return twoFactorConfirmation;
    } catch (e) {
        return null;
    }
}