"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Globe, Users, TrendingUp, ShieldCheck, Cpu, ArrowLeft, Target, Award } from "lucide-react"

export default function VisionPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Navigation */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <Leaf className="text-primary-foreground w-5 h-5" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">GreenBuild AI</span>
                    </Link>
                    <Button variant="ghost" asChild size="sm">
                        <Link href="/" className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </header>

            <main className="flex-1 py-12 md:py-24">
                <div className="container mx-auto px-4">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center mb-20"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
                            <Award className="w-3 h-3" />
                            <span>Project Vision & Strategy</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8">
                            A Regenerative <span className="text-primary italic">Decision Intelligence</span> System
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            GreenBuild AI is an AI-powered platform that empowers developers, architects, and homeowners
                            to build carbon-negative, affordable, and community-centric housing.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-12 max-w-5xl mx-auto"
                    >
                        {/* HMW Sections */}
                        <section className="space-y-8">
                            <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">Solving Global Challenges</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <Card className="border-none shadow-xl bg-white dark:bg-slate-900">
                                    <CardHeader>
                                        <Globe className="w-10 h-10 text-blue-500 mb-2" />
                                        <CardTitle className="text-lg">Carbon-Negative Cities</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground leading-relaxed">
                                        Prioritizing bio-based materials like hempcrete and mass timber that sequester carbon.
                                        Suggesting layouts that leverage natural ventilation to reach "energy-plus" standards.
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-xl bg-white dark:bg-slate-900">
                                    <CardHeader>
                                        <TrendingUp className="w-10 h-10 text-emerald-500 mb-2" />
                                        <CardTitle className="text-lg">Affordable & Sustainable</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground leading-relaxed">
                                        Our Cost-Carbon Engine identifies the "sweet spot" where low-carbon materials are also
                                        price-competitive, making green building a standard, not a luxury.
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-xl bg-white dark:bg-slate-900">
                                    <CardHeader>
                                        <Users className="w-10 h-10 text-amber-500 mb-2" />
                                        <CardTitle className="text-lg">Redesigning Urban Spaces</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-muted-foreground leading-relaxed">
                                        Data-driven urban regeneration prioritizing adaptive reuse and community-centric layouts
                                        that promote social flow and well-being.
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        {/* Evaluation Criteria Responses */}
                        <section className="space-y-8 mt-12">
                            <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">Strategic Framework</h2>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Cpu className="text-primary w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Innovation & Technology</h3>
                                            <p className="text-muted-foreground text-sm">
                                                Uses Gemini 2.0 Flash for real-time conversational reasoning. Unlike static tools,
                                                GreenBuild AI acts as a partner, explaining the "why" behind every material choice.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Target className="text-primary w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Realisability & Roadmap</h3>
                                            <ul className="text-muted-foreground text-sm space-y-2">
                                                <li>• <strong>3-Month MVP:</strong> Carbon Calculator & AI Advisor (Active)</li>
                                                <li>• <strong>6-Month PoC:</strong> Live supplier API integration</li>
                                                <li>• <strong>12-Month Scale:</strong> Regional regulatory compliance automation</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                                            <ShieldCheck className="text-primary w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">UN SDGs Commitment</h3>
                                            <p className="text-muted-foreground text-sm">
                                                Direct alignment with Goal 11 (Sustainable Cities), Goal 12 (Responsible Consumption),
                                                and Goal 13 (Climate Action). Tracking impact in tons of CO₂ avoided.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Leaf className="text-primary w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Diverse Expertise</h3>
                                            <p className="text-muted-foreground text-sm">
                                                A multidisciplinary team blending software engineering, AI ethics, and sustainable
                                                urban planning to ensure holistic solution delivery.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </motion.div>

                    <div className="mt-24 text-center">
                        <Button asChild size="lg" className="h-14 px-10 rounded-full text-xl font-semibold">
                            <Link href="/analyze">Start Analyzing Now</Link>
                        </Button>
                    </div>
                </div>
            </main>

            {/* Background patterns */}
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl" />
            </div>
        </div>
    )
}
