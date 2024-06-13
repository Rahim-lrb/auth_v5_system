import { currentUser } from "@/lib/auth"
import { UserInfo } from "@/components/auth/user-info";
import { auth } from "@/auth";


const ServerPage = async () => {
    // const session = await auth()
    // const user = JSON.stringify(session?.user) or use a reusable lib for server components currentUser

    const user = await currentUser()
    console.log("user")
    console.log(user)
    return (
        <>
            <UserInfo label="server component" user={user}/>
        </>
    );
};  

export default ServerPage;
