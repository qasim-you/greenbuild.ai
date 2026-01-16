"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { Leaf } from "lucide-react"

const publicPaths = ["/", "/login", "/privacy", "/terms", "/contact"]

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    const isPublicPath = publicPaths.includes(pathname)

    useEffect(() => {
        if (!loading && !user && !isPublicPath) {
            router.push("/login")
        }
    }, [user, loading, pathname, router, isPublicPath])

    if (loading && !isPublicPath) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-primary animate-bounce" />
                    </div>
                    <p className="text-muted-foreground font-medium">Authenticating...</p>
                </div>
            </div>
        )
    }

    if (!user && !isPublicPath) {
        return null
    }

    return <>{children}</>
}
