// @ts-nocheck
"use client"

import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormItem, FormLabel, FormMessage, FormControl, FormDescription, FormField } from "../ui/form"
import { Input } from "../ui/input"
import * as z from "zod"
import { RegisterSchema } from "@/schema"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { register } from "@/actions/register"
import { useState, useTransition } from "react"

export const RegisterForm = () => {
    const [error, setError] = useState<String>()
    const [success, setSuccess] = useState<String>()
    const [ isPending, startTransition ] = useTransition()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })


    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        // clear all errors and success messages
        setError("")
        setSuccess("")
        console.log("submitted")
        console.log(values)
        startTransition(() => {
            register(values).then((data) => {
                setError(data.error) ;
                setSuccess(data.success) ;
            })
        }) 
    }

    return (
        <CardWrapper headerLabel="create an account" backButtonLabel="already have an account?" backButtonHref="/auth/login" showSocial>
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>

                        <div className="space-y-4">
                            <FormField control={form.control} name="name" render={
                                ({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="john Doe" type="name" disabled={isPending}></Input>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )
                            }/>


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

                            <FormField control={form.control} name="password" render={
                                ({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="***********" type="password" disabled={isPending}></Input>
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                )
                            }/>
                            <FormError message={error}></FormError>
                            <FormSuccess message={success}></FormSuccess>
                            <Button type="submit" className="w-full">create an account</Button>
                        </div>
                    </form>
                </Form>
        </CardWrapper>
    )
}
