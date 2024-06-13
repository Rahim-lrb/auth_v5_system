"use client"
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserInfo } from "@/components/auth/user-info";
import { useCurrentRole } from "@/hooks/use-current-role";
import { currentRole } from "@/lib/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { userRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { admin } from "@/actions/admin";

const AdminPage = () => {
    // client comp 
    const role = useCurrentRole();
    console.log(role)

    // server comp
    // const role = currentRole();

    const onApiRoute = () => {
        fetch("/api/admin")
        .then((response)=> {
            if (response.ok) {
                console.log("ok")
                toast.success("allowed Api route")
            } else {
                console.log("error")
                toast.error("forbidden Api route")
            }
        })
    }

    const onServerAction = () => {
        admin().then((data) => {
            if (data.success) {
                toast.success(data.success)
            } 
            if (data.error) {
                toast.error(data.error)
            } 
        })
    }

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">Admin</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={userRole.ADMIN}>
                    <FormSuccess message="you are allowed to see this content"></FormSuccess>
                </RoleGate>
                <div className="flex flex-row items-center justify-between border p-3 rounded-lg shadow-md">
                    <p className="text-sm font-medium">Admin-only Api route</p>
                    <Button onClick={onApiRoute}>click to test</Button>
                </div>

                <div className="flex flex-row items-center justify-between border p-3 rounded-lg shadow-md">
                    <p className="text-sm font-medium">Admin-only server action</p>
                    <Button onClick={onServerAction}>click to test</Button>
                </div>
            </CardContent>
        </Card>
    );
};  

export default AdminPage;
