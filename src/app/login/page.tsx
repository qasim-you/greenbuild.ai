"use client"

import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, LogIn } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LoginPage() {
    const { user, loginWithEmail, registerWithEmail, loading } = useAuth()
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (user) {
            router.push("/")
        }
    }, [user, router])

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsSubmitting(true)

        try {
            if (isLogin) {
                await loginWithEmail(email, password)
            } else {
                await registerWithEmail(email, password)
            }
            router.push("/")
        } catch (err: any) {
            setError(err.message || "An error occurred during authentication.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-primary animate-bounce" />
                    </div>
                    <p className="text-muted-foreground font-medium">Loading GreenBuild AI...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-full max-w-md border-none shadow-2xl bg-card/50 backdrop-blur-xl">
                    <CardHeader className="text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                                <Leaf className="text-primary-foreground w-8 h-8" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-3xl font-bold tracking-tight">
                                {isLogin ? "Welcome Back" : "Create Account"}
                            </CardTitle>
                            <CardDescription className="text-lg">
                                {isLogin
                                    ? "Sign in to access your sustainability tools."
                                    : "Join GreenBuild AI to build the future."}
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-4">
                        <form onSubmit={handleAuth} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-12 text-base"
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-12 text-base"
                                />
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm text-center font-medium">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-12 text-lg font-semibold"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </span>
                                ) : (
                                    isLogin ? "Sign In" : "Sign Up"
                                )}
                            </Button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or
                                </span>
                            </div>
                        </div>

                        <div className="text-center">
                            <Button
                                variant="link"
                                onClick={() => {
                                    setIsLogin(!isLogin)
                                    setError("")
                                }}
                                className="text-primary font-medium"
                            >
                                {isLogin
                                    ? "Don't have an account? Sign Up"
                                    : "Already have an account? Sign In"}
                            </Button>
                        </div>

                        <p className="text-center text-sm text-muted-foreground pt-4 border-t">
                            By signing in, you agree to our{" "}
                            <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

import Link from "next/link"
