"use client";

import { settings } from "@/actions/settings";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import * as z from "zod";
import { settingsSchema } from "@/schema";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentUser } from "@/hooks/use-current-user";

import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { userRole } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const SettingsPage = () => {
    const user = useCurrentUser();

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const { update } = useSession();

    const isUserRole = (role: any): role is userRole => {
        return role === userRole.ADMIN || role === userRole.USER;
    };

    const form = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            password: "",
            newPassword: "",
            role: isUserRole(user?.role) ? user.role : undefined, // Only assign if it's a valid role
            isTwoFactoredEnabled: user?.isTwoFactoredEnabled || false,
        },
    });

    const onSubmit = (values: z.infer<typeof settingsSchema>) => {
        startTransition(() => {
            settings(values)
                .then((response) => {
                    if (response.error) {
                        setError(response.error);
                        setSuccess(undefined);
                    } else {
                        setError(undefined);
                        setSuccess(response.success);
                        update(); // to update the session
                    }
                })
                .catch((err) => {
                    setError("An error occurred");
                    setSuccess(undefined);
                    console.error(err);
                });
        });
    };

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl text-center font-semibold">Settings</p>
            </CardHeader>
            <CardContent>
                <FormProvider {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            {user?.isOAuth == false && (
                                <>
                                    <FormField control={form.control} name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="John Doe" disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="john_doe@gmail.com"
                                                        disabled={isPending}
                                                        type="email"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="*******"
                                                        disabled={isPending}
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="*******"
                                                        disabled={isPending}
                                                        type="password"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select
                                            disabled={isPending}
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={userRole.ADMIN}>Admin</SelectItem>
                                                <SelectItem value={userRole.USER}>User</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isTwoFactoredEnabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between shadow-sm rounded-lg p-3">
                                        <div className="space-y-0.5">
                                            <FormLabel>Is Two Factor Enabled:</FormLabel>
                                            <FormDescription>Enable two-factor authentication</FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                disabled={isPending}
                                                onCheckedChange={field.onChange}
                                                checked={field.value}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error || ""} />
                        <FormSuccess message={success || ""} />
                        <Button type="submit" disabled={isPending}>
                            Save
                        </Button>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
};

export default SettingsPage;
