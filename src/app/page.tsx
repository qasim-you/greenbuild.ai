"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Leaf, Zap, BarChart3, Globe, Target, Users } from "lucide-react"

import { useAuth } from "@/context/AuthContext"
import { LogOut, User } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function LandingPage() {
  const { user, logout } = useAuth()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer hover:translate-x-1 transition-transform">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="text-primary-foreground w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">GreenBuild AI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How it Works</Link>
            <Link href="/vision" className="text-sm font-medium hover:text-primary transition-colors">Our Vision</Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Button asChild variant="default" size="sm" className="rounded-full">
                  <Link href="/analyze">Analyze Project</Link>
                </Button>
                <Button onClick={() => logout()} variant="ghost" size="sm" className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 overflow-hidden relative">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                <Globe className="w-3 h-3" />
                <span>Next-Gen Sustainability for Construction</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground">
                Build <span className="text-primary">Smarter.</span> <br />
                Build <span className="text-primary">Greener.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                AI-powered carbon-smart construction decisions. Instantly estimate impact, receive green alternatives, and build the future sustainably.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button asChild size="lg" className="h-12 px-8 rounded-full text-lg font-semibold group text-white">
                  <Link href="/analyze">
                    Analyze Your Building
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="h-12 px-8 rounded-full text-lg font-semibold">
                  <Link href="/vision">View Our Vision</Link>
                </Button>
              </div>

              {/* Hero Image Slider */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mt-16 relative"
              >
                <Carousel
                  plugins={[
                    Autoplay({
                      delay: 4000,
                    }),
                  ]}
                  className="w-full max-w-5xl mx-auto"
                >
                  <CarouselContent>
                    {[
                      { src: "/hero-1.png", alt: "Vertical Gardens Skyscraper" },
                      { src: "/hero-2.png", alt: "Modular Sustainable Construction" },
                      { src: "/hero-3.png", alt: "Green Future City" }
                    ].map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="rounded-2xl overflow-hidden shadow-2xl border-8 border-white/50 aspect-video relative">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                            <p className="text-white text-lg font-medium opacity-90">{img.alt}</p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 bg-background/50 backdrop-blur border-none hover:bg-background/80" />
                  <CarouselNext className="right-4 bg-background/50 backdrop-blur border-none hover:bg-background/80" />
                </Carousel>
              </motion.div>


              {/* Stats Overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold">12M+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Tons CO₂ Avoided</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">450+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Green Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">30%</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Avg. Cost Saving</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">99%</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">AI Accuracy</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 blur-[120px] opacity-20 bg-primary h-[500px] w-[500px] rounded-full" />
          <div className="absolute bottom-0 right-0 -z-10 blur-[120px] opacity-20 bg-blue-500 h-[500px] w-[500px] rounded-full" />
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">Comprehensive Analysis</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to make informed, sustainable construction decisions.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              <motion.div variants={itemVariants}>
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow bg-card/50 backdrop-blur">
                  <CardContent className="pt-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                      <Zap className="text-primary w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Carbon Analysis</h3>
                    <p className="text-muted-foreground">
                      Instant embodied carbon estimates based on your building's scale, type, and location.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow bg-card/50 backdrop-blur">
                  <CardContent className="pt-8">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                      <Leaf className="text-blue-500 w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">AI Recommendations</h3>
                    <p className="text-muted-foreground">
                      Personalized suggestions for low-carbon materials and structural optimizations powered by Google Gemini.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow bg-card/50 backdrop-blur">
                  <CardContent className="pt-8">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                      <BarChart3 className="text-amber-500 w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Cost vs Carbon</h3>
                    <p className="text-muted-foreground">
                      Live comparison of traditional builds versus GreenBuild recommendations to find your sweet spot.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Three Steps to a Greener Build</h2>
              <p className="text-muted-foreground">The easiest way to decarbonize your next project.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                { step: "01", title: "Input Specs", desc: "Define your building type, area, and location." },
                { step: "02", title: "AI Generation", desc: "Gemini analyzes data and finds green alternatives." },
                { step: "03", title: "Optimize", desc: "Compare results and export your sustainable plan." }
              ].map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="text-8xl font-black text-primary/5 absolute -top-8 -left-4">
                    {item.step}
                  </div>
                  <div className="relative pt-4 z-10">
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Vision Preview */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  <Target className="w-3 h-3" />
                  <span>Strategic Roadmap</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Regenerating our cities <br />
                  <span className="text-primary">one decision at a time.</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our solution isn't just a calculator. It's a strategic framework for carbon-negative,
                  affordable housing that aligns with the UN Sustainable Development Goals.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/20 p-1 rounded-full"><Leaf className="w-4 h-4 text-primary" /></div>
                    <p className="font-medium text-sm">Carbon-Negative Materials via Bio-Sequestration</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/20 p-1 rounded-full"><Globe className="w-4 h-4 text-primary" /></div>
                    <p className="font-medium text-sm">Real-time SDG Impact Tracking (Goal 11, 12, 13)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/20 p-1 rounded-full"><Users className="w-4 h-4 text-primary" /></div>
                    <p className="font-medium text-sm">Community-Centric Urban Regeneration Models</p>
                  </div>
                </div>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/vision">Read Full Strategy</Link>
                </Button>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-4">
                  <h4 className="font-bold text-primary">MVP</h4>
                  <p className="text-xs text-muted-foreground">3 Month Goal: Full Carbon Decision Engine & Advisor</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-4 translate-y-8">
                  <h4 className="font-bold text-primary">POC</h4>
                  <p className="text-xs text-muted-foreground">6 Month Goal: Live Regional Supplier API Integration</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold">Ready to reduce your carbon footprint?</h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of architects and builders using GreenBuild AI to design the future.
              </p>
              <Button asChild size="lg" className="h-14 px-10 rounded-full text-xl font-semibold">
                <Link href="/analyze">Start Your Free Analysis</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <Leaf className="text-primary-foreground w-4 h-4" />
              </div>
              <span className="font-bold text-lg tracking-tight">GreenBuild AI</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2026 GreenBuild AI. Built for the future of Earth.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
