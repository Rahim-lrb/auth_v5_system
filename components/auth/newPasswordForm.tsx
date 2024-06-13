// @ts-nocheck
"use client"

import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormItem, FormLabel, FormMessage, FormControl, FormDescription, FormField } from "../ui/form"
import { Input } from "../ui/input"
import * as z from "zod"
import { newPasswordSchema } from "@/schema"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { newPassword } from "@/actions/new-password"
import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"

import Link from "next/link"


export const NewPasswordForm = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token');


    const [error, setError] = useState<String>()
    const [success, setSuccess] = useState<String>()
    const [isPending, startTransition ] = useTransition()

    const form = useForm<z.infer<typeof newPasswordSchema>>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: "",
        }
    })


    const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
        // clear all errors and success messages
        setError("")
        setSuccess("")
        console.log(values)

        startTransition(() => {
            newPassword(values, token).then((data) => {
                if (data) {
                    setError(data.error || "")
                    setSuccess(data.success || "")
                } else {
                    setError("An unexpected error occurred.")
                }
            })
        }) 
    }

    return (
        <CardWrapper headerLabel="enter a new password" backButtonLabel="back to login" backButtonHref="/auth/auth">
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>

                        <div className="space-y-4">
                            <FormField control={form.control} name="password" render={
                                ({field}) => (
                                    <FormItem>
                                        <FormLabel>password</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="**********" type="password" disabled={isPending}></Input>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )
                            }/>

                            <FormError message={error}></FormError>
                            <FormSuccess message={success}></FormSuccess>
                            
                            <Button type="submit" className="w-full">reset password</Button>
                        </div>
                    </form>
                </Form>
        </CardWrapper>
    )
}
