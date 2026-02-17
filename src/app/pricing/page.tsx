"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Leaf, X } from "lucide-react"

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
            <header className="border-b bg-background/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Leaf className="text-primary-foreground w-4 h-4" />
                        </div>
                        <span className="font-bold text-lg">GreenBuild AI</span>
                    </Link>
                    <nav className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-sm font-medium hover:text-primary">Dashboard</Link>
                        <Button asChild size="sm">
                            <Link href="/login">Get Started</Link>
                        </Button>
                    </nav>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-20 max-w-6xl">
                <div className="text-center space-y-4 mb-16">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">Simple, Transparent Pricing</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Choose the plan that fits your sustainable construction needs. From single builds to enterprise portfolios.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Free Plan */}
                    <Card className="border-slate-200 dark:border-slate-800 shadow-lg relative">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Starter</CardTitle>
                            <CardDescription>For individuals and small tests</CardDescription>
                            <div className="mt-4">
                                <span className="text-4xl font-black">$0</span>
                                <span className="text-muted-foreground">/mo</span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    3 Project Analyses / Month
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    Basic Carbon Estimation
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    Standard Materials Database
                                </li>
                                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <X className="w-4 h-4" />
                                    AI Optimization Engine
                                </li>
                                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <X className="w-4 h-4" />
                                    Export PDF Reports
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="outline" asChild>
                                <Link href="/login">Get Started Free</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Pro Plan */}
                    <Card className="border-emerald-500 shadow-2xl relative scale-105 z-10">
                        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                            Most Popular
                        </div>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-emerald-600">Professional</CardTitle>
                            <CardDescription>For architects and builders</CardDescription>
                            <div className="mt-4">
                                <span className="text-4xl font-black">$49</span>
                                <span className="text-muted-foreground">/mo</span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm font-medium">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    Unlimited Projects
                                </li>
                                <li className="flex items-center gap-2 text-sm font-medium">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    Advanced AI Optimization
                                </li>
                                <li className="flex items-center gap-2 text-sm font-medium">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    Detailed Material Swaps
                                </li>
                                <li className="flex items-center gap-2 text-sm font-medium">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    Export Professional Reports
                                </li>
                                <li className="flex items-center gap-2 text-sm font-medium">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    Priority Support
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                                <Link href="/login?plan=pro">Start Pro Trial</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Enterprise Plan */}
                    <Card className="border-slate-200 dark:border-slate-800 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Enterprise</CardTitle>
                            <CardDescription>For firms and organizations</CardDescription>
                            <div className="mt-4">
                                <span className="text-4xl font-black">Custom</span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    Everything in Pro
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    API Access
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    Custom Material Database
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    SSO & Team Management
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    Dedicated Account Manager
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="outline" asChild>
                                <Link href="/contact">Contact Sales</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="mt-20 text-center">
                    <h3 className="text-lg font-bold mb-4">Trusted by industry leaders</h3>
                    <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale">
                        {/* Placeholder logos */}
                        <div className="text-xl font-black">ACME Construction</div>
                        <div className="text-xl font-black">Global Architects</div>
                        <div className="text-xl font-black">EcoBuilders Inc</div>
                        <div className="text-xl font-black">UrbanFuture</div>
                    </div>
                </div>
            </main>
        </div>
    )
}
