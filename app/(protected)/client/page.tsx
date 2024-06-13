"use client"
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserInfo } from "@/components/auth/user-info";


const ClientPage = () => {
    const user = useCurrentUser()
    console.log(user)
    return (
        <>
            <UserInfo label="client component" user={user}/>
        </>
    );
};  

export default ClientPage;
