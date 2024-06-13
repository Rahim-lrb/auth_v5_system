import { currentRole } from "@/lib/auth"
import { userRole } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET() {
    const role = await currentRole()
    if (role === userRole.ADMIN ) {
        return new NextResponse(null, {status: 200})
    }
    // we can make the api only used by an admin
    return new NextResponse(null, {status: 403})
}