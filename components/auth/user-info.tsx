// @ts-nocheck
import { ExtendedUser } from "@/next-auth"
import { Card, CardHeader, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"


interface UserInfoProps {
    user?: ExtendedUser,
    label: string
}

export const UserInfo = ( { user, label}: UserInfoProps ) => {
    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader><p className="text-2xl font-semibold text-center">{label}</p></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium ">ID:</p>
                    <p className="truncate text-xs font-mono rounded-md bg-slate-100 p-1 max-w-[180px]">{user?.id}</p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium ">name:</p>
                    <p className="truncate text-xs font-mono rounded-md bg-slate-100 p-1 max-w-[180px]">{user?.name}</p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium ">email:</p>
                    <p className="truncate text-xs font-mono rounded-md bg-slate-100 p-1 max-w-[180px]">{user?.email}</p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium ">role:</p>
                    <p className="truncate text-xs font-mono rounded-md bg-slate-100 p-1 max-w-[180px]">{user?.role}</p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium ">two factor authentication:</p>
                    <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"} className="truncate text-xs font-mono rounded-md bg-slate-100 p-1 max-w-[180px]">{user?.isTwoFactorEnabled ? "on" : "off"}</Badge>
                </div>
            </CardContent>
        </Card>
    )
}