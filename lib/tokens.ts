import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { v4 as uuid } from "uuid";
import { db } from "./db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";

import crypto from "crypto"
import { getTwoFactorConfirmationByToken } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";


export const generateVerificationToken = async (email: string) => {
    const token = uuid(); // Corrected to use uuid()
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

    // Check if we have an existing token
    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
        // Remove it from db
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    // Create new verification token
    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return verificationToken;
};


export const generateResetPasswordToken = async (email: string) => {
    const token = uuid(); // Corrected to use uuid()
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    // Create new verification token
    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return passwordResetToken;
}




export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100000, 1000000).toString(); // 6-digit number
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

    const existingToken = await getTwoFactorTokenByEmail(email);
    if (existingToken) {
        await db.twoFactorToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    // Create new two-factor token
    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return twoFactorToken;
};
