"use client"

import { FcGoogle } from "react-icons/fc"
import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export const Social = () => {
    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }
    return (
        <div className="grid grid-cols-2 w-full gap-2">
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={()=> onClick("google")}
            >
                <FcGoogle className="h-5 w-5"/>
            </Button>
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={()=> onClick("github")}
            >
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    )
}   