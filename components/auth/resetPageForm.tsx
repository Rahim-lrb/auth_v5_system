// @ts-nocheck
"use client"

import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormItem, FormLabel, FormMessage, FormControl, FormDescription, FormField } from "../ui/form"
import { Input } from "../ui/input"
import * as z from "zod"
import { resetSchema } from "@/schema"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { reset } from "@/actions/reset"
import { useState, useTransition } from "react"

import Link from "next/link"


export const ResetPageForm = () => {
    const [error, setError] = useState<String>()
    const [success, setSuccess] = useState<String>()
    const [isPending, startTransition ] = useTransition()

    const form = useForm<z.infer<typeof resetSchema>>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            email: "",
        }
    })


    const onSubmit = (values: z.infer<typeof resetSchema>) => {
        // clear all errors and success messages
        setError("")
        setSuccess("")
        console.log(values)

        startTransition(() => {
            reset(values).then((data) => {
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
        <CardWrapper headerLabel="Forgot your password ?" backButtonLabel="back to login" backButtonHref="/auth/auth">
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>

                        <div className="space-y-4">
                            <FormField control={form.control} name="email" render={
                                ({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="johnDoe@example.com" type="email" disabled={isPending}></Input>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )
                            }/>

                            <FormError message={error}></FormError>
                            <FormSuccess message={success}></FormSuccess>
                            
                            <Button type="submit" className="w-full">send reset email</Button>
                        </div>
                    </form>
                </Form>
        </CardWrapper>
    )
}
