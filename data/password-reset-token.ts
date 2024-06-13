// @ts-nocheck
import { db } from "@/lib/db";


export const getPasswordResetTokenByToken = async ( token: string ) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findUnique({
            where: { token }
        });
        console.log("password reset token: " + passwordResetToken)
        return passwordResetToken;
        
    } catch (err) {
        return null;
    }
}


export const getPasswordResetTokenByEmail = async ( email: string ) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: { email }
        });
        return passwordResetToken;
        
    } catch (err) {
        return null;
    }
}