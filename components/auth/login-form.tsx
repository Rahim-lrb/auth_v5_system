// @ts-nocheck
"use client"

import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormItem, FormLabel, FormMessage, FormControl, FormDescription, FormField } from "../ui/form"
import { Input } from "../ui/input"
import * as z from "zod"
import { loginSchema } from "@/schema"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { login } from "@/actions/login"
import { useState, useTransition } from "react"

import { useSearchParams } from "next/navigation"
import Link from "next/link"



export const LoginForm = () => {
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [isPending, startTransition ] = useTransition()
    // new state
    const [showTwoFactor, setShowTwoFactor] = useState(false)
    const searchParams = useSearchParams()
    const urlError = searchParams.get("error") == "OAuthAccountNotLinked"
    ? "email already in use with different provider" : ""

    // callback 
    const callbackUrl = searchParams.get("callbackUrl")

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })


    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        // clear all errors and success messages
        setError("")
        setSuccess("")

        console.log(values)

        // login(values)
        startTransition(() => {
            login(values, callbackUrl).then((data) => {
                // setError(data.error) ;
                // setSuccess(data.success) ;
                if (data?.error) {
                    form.reset();
                    setError(data.error)
                }
                if (data?.success) {
                    form.reset();
                    setSuccess(data.success)
                }
                // 2fa
                if (data?.twoFactor) {
                    // form.reset(); do not reset it, we need the credentials
                    setShowTwoFactor(true)
                }
            }).catch((e) => setError("something is wrong"));
        }) 
    }

    return (
        <CardWrapper headerLabel="welcome back" backButtonLabel="don't have an account" backButtonHref="/auth/register" showSocial>
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>

                        <div className="space-y-4">
                            {!showTwoFactor &&
                                (<>
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

                                                <Button size="sm" variant="link" asChild className="px-0 font-normal">
                                                    <Link href="/auth/reset">Forgot password ?</Link>
                                                </Button>

                                                <FormMessage></FormMessage>
                                            </FormItem>
                                        )
                                    }/>
                                </>)
                            }
                            {
                                showTwoFactor && (
                                    <FormField control={form.control} name="code" render={
                                    ({field}) => (
                                        <FormItem>
                                            <FormLabel>two factor code</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="123456" disabled={isPending}></Input>
                                            </FormControl>
                                            <FormMessage></FormMessage>
                                        </FormItem>
                                    )
                                    }/>
                                )
                            }

                            <FormError message={error || urlError || ""} />
                            <FormSuccess message={success || ""} />
                            
                            <Button type="submit" className="w-full">{showTwoFactor ? "Confirm" : "Login"}</Button>
                        </div>
                    </form>
                </Form>
        </CardWrapper>
    )
}
