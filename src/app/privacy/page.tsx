import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <Button asChild variant="ghost" className="mb-8 pl-0 hover:bg-transparent">
                    <Link href="/">
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Back to Home
                    </Link>
                </Button>

                <div className="flex items-center gap-4 mb-12">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <Shield className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
                        <p className="text-muted-foreground mt-2">Last updated: January 16, 2026</p>
                    </div>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-muted-foreground">
                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                        <p>
                            Welcome to GreenBuild AI. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                        <p>
                            We collect information that you provide directly to us when you:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Create an account or profile</li>
                            <li>Input project specifications for carbon analysis</li>
                            <li>Contact our support team</li>
                            <li>Subscribe to our newsletter</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                        <p>
                            We use the collected information to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide and improve our AI-powered sustainability analysis</li>
                            <li>Personalize your experience and recommendations</li>
                            <li>Communicate with you about updates and new features</li>
                            <li>Maintain the security and integrity of our platform</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-foreground mb-4">5. Third-Party Services</h2>
                        <p>
                            We use Firebase for authentication and Google Gemini for AI analysis. These services have their own privacy policies which we encourage you to review.
                        </p>
                    </section>

                    <section className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <p className="font-semibold text-primary mt-2">qasimyousaf094@gmail.com</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
