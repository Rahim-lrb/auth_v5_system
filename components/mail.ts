import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendVerificationEmail = async (email: string, token: string) => {
    try {
        const confirmLink = `${domain}/auth/new-verification?token=${token}`;
        await resend.emails.send({
            from: 'rahim <rahimauth@resend.dev>',
            to: email,
            subject: 'Confirm your email',
            html: `<p>Click <a href="${confirmLink}">here</a> to verify your email address.</p>`
        });
        console.log('Verification email sent successfully.');
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};


export const sendVerificationPassword = async (email: string, token: string) => {
    try {
        const resetLink = `${domain}/auth/new-password?token=${token}`;
        await resend.emails.send({
            from: 'rahim <rahimauth@resend.dev>',
            to: email,
            subject: 'reset your password',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`
        });
        console.log('password reset completed');
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};



export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    try {
        await resend.emails.send({
            from: 'rahim <rahimauth@resend.dev>',
            to: email,
            subject: '2fa code',
            html: `<p>your 2fa code ${token}</p>`
        });
        console.log('2fa sent successfully');
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};
