import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins ({
  subsets: ["latin"],
  weight: ["600"]
})

export default async function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-t from-sky-500 to-blue-800">
      {/* <h1 className="text-red-700 font-bold">hey</h1> */}
      {/* <Button size="lg" variant="custom" >hello</Button> */}
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", font.className)}>🔒 Auth</h1>
        <p className="text-white text-lg">a simple authentication service</p>

        <div>
          <LoginButton mode="model" asChild>
            <Button size="lg" variant="secondary" >sign in</Button>
          </LoginButton>
        </div>
      </div>
    </main>

  );
}
