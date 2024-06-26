import { userRole } from "@prisma/client"
import * as z from "zod"

export const loginSchema = z.object({
    email: z.string().email({message: "email is required"}),
    password: z.string().min(1, {message: "password is required"}),
    code: z.optional(z.string())
})


export const RegisterSchema = z.object({
    name: z.string().min(1, {message: "name is required"}),
    email: z.string().email({message: "email is required"}),
    password: z.string().min(6, {message: "minimum 6 characters required"}),
})


export const resetSchema = z.object({
    email: z.string().email({message: "Email is required"}),
})


export const newPasswordSchema = z.object({
    password: z.string().min(6, {message: "password is required"}),
})


export const settingsSchema = z.object({
    name: z.optional(z.string().min(1)),
    isTwoFactoredEnabled: z.optional(z.boolean()),
    role: z.enum([userRole.ADMIN, userRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6))
}).refine((data) => {
    if (data.password && !data.newPassword) {
        return false;
    }
    if (!data.password && data.newPassword) {
        return false;
    }
    return true
}, {
    message: "new password is required",
    path: ["newPassword"],
})
