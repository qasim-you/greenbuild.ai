"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {
    Building2,
    MapPin,
    Ruler,
    Layers,
    Wallet,
    ArrowRight,
    ArrowLeft,
    ChevronRight,
    Sparkles,
    Leaf
} from "lucide-react"

const STEPS = [
    { id: "basic", title: "Building Type", icon: Building2 },
    { id: "size", title: "Dimensions", icon: Ruler },
    { id: "location", title: "Location", icon: MapPin },
    { id: "budget", title: "Sensitivity", icon: Wallet }
]

export default function AnalyzePage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        type: "",
        area: "",
        floors: "",
        location: "",
        budget: "Medium"
    })

    const updateFormData = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1)
        } else {
            handleSubmit()
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1)
        }
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)

        // Validate
        if (!formData.type || !formData.area || !formData.floors || !formData.location) {
            alert("Please fill in all fields")
            setIsSubmitting(false)
            return
        }

        // Call API and redirect with results
        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    area: parseFloat(formData.area),
                    floors: parseInt(formData.floors)
                })
            })

            const data = await response.json()

            // Store in session storage for the results page
            sessionStorage.setItem("analysis-result", JSON.stringify(data))
            sessionStorage.setItem("analysis-specs", JSON.stringify(formData))

            router.push("/results")
        } catch (error) {
            console.error("Submission error:", error)
            setIsSubmitting(false)
        }
    }

    const stepProgress = ((currentStep + 1) / STEPS.length) * 100

    return (
        <div className="min-h-screen bg-muted/30 flex flex-col">
            {/* Header */}
            <header className="border-b bg-background p-4">
                <div className="container mx-auto flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Leaf className="text-primary-foreground w-4 h-4" />
                    </div>
                    <span className="font-bold text-lg">GreenBuild AI</span>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
                <div className="space-y-8">
                    {/* Progress Indicator */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-medium text-muted-foreground">
                            <span>Step {currentStep + 1} of {STEPS.length}</span>
                            <span>{STEPS[currentStep].title}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${stepProgress}%` }}
                                transition={{ type: "spring", stiffness: 50 }}
                            />
                        </div>
                    </div>

                    <Card className="shadow-xl border-none">
                        <CardContent className="pt-8 pb-8 px-8">
                            <AnimatePresence mode="wait">
                                {currentStep === 0 && (
                                    <motion.div
                                        key="step-0"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-2">
                                            <h2 className="text-2xl font-bold">What are we building?</h2>
                                            <p className="text-muted-foreground">Select the type of project to begin analysis.</p>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {[
                                                { id: "House", icon: Building2, desc: "Residential, single-family" },
                                                { id: "Office", icon: Building2, desc: "Commercial office space" },
                                                { id: "School", icon: Building2, desc: "Educational institutions" },
                                                { id: "Hospital", icon: Building2, desc: "Healthcare facilities" }
                                            ].map((type) => (
                                                <button
                                                    key={type.id}
                                                    onClick={() => updateFormData("type", type.id)}
                                                    className={`flex items-start text-left gap-4 p-4 rounded-xl border-2 transition-all ${formData.type === type.id
                                                            ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                                                            : "border-muted hover:border-slate-300"
                                                        }`}
                                                >
                                                    <div className={`p-2 rounded-lg ${formData.type === type.id ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                                                        <type.icon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{type.id}</div>
                                                        <div className="text-xs text-muted-foreground">{type.desc}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 1 && (
                                    <motion.div
                                        key="step-1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-2">
                                            <h2 className="text-2xl font-bold">Dimensions & Scale</h2>
                                            <p className="text-muted-foreground">Provide physical specifications for accurate carbon modeling.</p>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="area">Total Floor Area (sq ft)</Label>
                                                <div className="relative">
                                                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                    <Input
                                                        id="area"
                                                        type="number"
                                                        placeholder="e.g. 2500"
                                                        className="pl-10 h-12"
                                                        value={formData.area}
                                                        onChange={(e) => updateFormData("area", e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="floors">Number of Floors</Label>
                                                <div className="relative">
                                                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                    <Input
                                                        id="floors"
                                                        type="number"
                                                        placeholder="e.g. 2"
                                                        className="pl-10 h-12"
                                                        value={formData.floors}
                                                        onChange={(e) => updateFormData("floors", e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 2 && (
                                    <motion.div
                                        key="step-2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-2">
                                            <h2 className="text-2xl font-bold">Project Location</h2>
                                            <p className="text-muted-foreground">Location affects transport emissions and material availability.</p>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="location">City / Country</Label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                    <Input
                                                        id="location"
                                                        placeholder="e.g. Seattle, USA"
                                                        className="pl-10 h-12"
                                                        value={formData.location}
                                                        onChange={(e) => updateFormData("location", e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 3 && (
                                    <motion.div
                                        key="step-3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-2">
                                            <h2 className="text-2xl font-bold">Budget Sensitivity</h2>
                                            <p className="text-muted-foreground">How much are you willing to prioritize sustainability over cost?</p>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <Label>Sensitivity Level</Label>
                                                <div className="grid grid-cols-3 gap-4">
                                                    {["Low", "Medium", "High"].map((level) => (
                                                        <button
                                                            key={level}
                                                            onClick={() => updateFormData("budget", level)}
                                                            className={`p-4 rounded-xl border-2 transition-all ${formData.budget === level
                                                                    ? "border-primary bg-primary/5 font-bold"
                                                                    : "border-muted hover:border-slate-300"
                                                                }`}
                                                        >
                                                            {level}
                                                        </button>
                                                    ))}
                                                </div>
                                                <p className="text-xs text-muted-foreground text-center">
                                                    {formData.budget === "Low" && "Focus strictly on lowest carbon regardless of cost."}
                                                    {formData.budget === "Medium" && "Find a balance between green materials and standard pricing."}
                                                    {formData.budget === "High" && "Only recommend green alternatives with minimal cost impact."}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="mt-12 flex justify-between items-center">
                                <Button
                                    variant="ghost"
                                    onClick={prevStep}
                                    disabled={currentStep === 0 || isSubmitting}
                                    className="rounded-full"
                                >
                                    <ArrowLeft className="mr-2 w-4 h-4" />
                                    Back
                                </Button>
                                <Button
                                    onClick={nextStep}
                                    disabled={
                                        isSubmitting ||
                                        (currentStep === 0 && !formData.type) ||
                                        (currentStep === 1 && (!formData.area || !formData.floors)) ||
                                        (currentStep === 2 && !formData.location)
                                    }
                                    className="rounded-full h-12 px-8 font-semibold min-w-32"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Analyzing...
                                        </div>
                                    ) : currentStep === STEPS.length - 1 ? (
                                        <div className="flex items-center gap-2">
                                            Generate Report
                                            <Sparkles className="w-4 h-4" />
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            Next
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
