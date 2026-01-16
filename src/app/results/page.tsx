"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    AreaChart,
    Area
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
    Leaf,
    ArrowLeft,
    Download,
    Share2,
    TrendingDown,
    AlertCircle,
    CheckCircle2,
    Zap,
    DollarSign,
    ShieldCheck,
    Building,
    Car,
    TreePine,
    Home,
    Sparkles,
    Scale,
    Info,
    ArrowRight
} from "lucide-react"
import { calculateDetailedEngine, getCarbonIntensityLabel, getImpactEquivalents } from "@/lib/carbon-logic"

export default function ResultsPage() {
    const [apiData, setApiData] = useState<any>(null)
    const [specs, setSpecs] = useState<any>(null)
    const [optimizationBias, setOptimizationBias] = useState(0.5) // 0: Cost-first, 1: Carbon-first
    const [activeScenario, setActiveScenario] = useState<"current" | "baseline" | "best">("current")

    useEffect(() => {
        const storedResult = sessionStorage.getItem("analysis-result")
        const storedSpecs = sessionStorage.getItem("analysis-specs")

        if (storedResult) setApiData(JSON.parse(storedResult))
        if (storedSpecs) setSpecs(JSON.parse(storedSpecs))
    }, [])

    // Real-time recalculation engine (Client-side)
    const currentResults = useMemo(() => {
        if (!apiData?.materials || !specs) return null;
        return calculateDetailedEngine(specs, apiData.materials, optimizationBias);
    }, [apiData, specs, optimizationBias]);

    const scenarios = useMemo(() => {
        if (!apiData?.materials || !specs) return null;
        return {
            baseline: calculateDetailedEngine(specs, apiData.materials, 0),
            current: currentResults,
            best: calculateDetailedEngine(specs, apiData.materials, 1)
        }
    }, [apiData, specs, currentResults]);

    if (!apiData || !specs || !currentResults) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-6">
                    <div className="relative w-24 h-24 mx-auto">
                        <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        <Leaf className="absolute inset-0 m-auto w-10 h-10 text-primary animate-pulse" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Running Decision Logic</h2>
                        <p className="text-muted-foreground font-medium">Parsing ICE v3.0 datasets & Regional Costs...</p>
                    </div>
                </div>
            </div>
        )
    }

    const { totalCarbon, totalCost, materials, intensity } = currentResults;
    const intensityInfo = getCarbonIntensityLabel(totalCarbon, specs.area);
    const equivalents = getImpactEquivalents(totalCarbon);

    // Compare with baseline
    const baseline = scenarios?.baseline;
    const carbonSaving = baseline ? ((baseline.totalCarbon - totalCarbon) / baseline.totalCarbon) * 100 : 0;
    const costDelta = baseline ? ((totalCost - baseline.totalCost) / baseline.totalCost) * 100 : 0;

    const chartData = [
        { name: "Traditional (Baseline)", carbon: baseline?.totalCarbon, fill: "#94a3b8" },
        { name: "Live Optimization", carbon: totalCarbon, fill: "#059669" },
        { name: "Theoretical Min", carbon: scenarios?.best.totalCarbon, fill: "#10b981" }
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20 dark:bg-slate-950">
            {/* Navbar */}
            <header className="border-b bg-background/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 h-18 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/analyze" className="p-2 hover:bg-muted rounded-xl transition-all">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <Leaf className="text-white w-5 h-5" />
                            </div>
                            <div>
                                <span className="font-bold text-lg block leading-none">GreenBuild AI</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold font-mono">Real-Time Advisor</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-bold border border-emerald-500/20">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Verified Datasets
                        </div>
                        <Button variant="outline" size="sm" className="hidden sm:flex rounded-full border-slate-200">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                        </Button>
                        <Button size="sm" className="rounded-full shadow-lg shadow-primary/20">
                            <Download className="w-4 h-4 mr-2" />
                            Report
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
                {/* Upper Hero */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-3 py-1">
                                Decision Intelligence System
                            </Badge>
                            <Badge variant="outline" className={`${intensityInfo.bg} ${intensityInfo.color} border-none px-3 py-1`}>
                                {intensityInfo.label} Intensity Build
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                            Real-Time <span className="text-primary">Impact</span> Dashboard
                        </h1>
                        <p className="text-muted-foreground flex items-center gap-3 font-medium">
                            <Building className="w-4 h-4 text-primary/60" />
                            {specs.type} • {specs.area.toLocaleString()} sq ft • {specs.floors} Floors • {specs.location}
                        </p>
                    </div>

                    {/* Scenario Comparison Selector */}
                    <div className="bg-slate-200/50 dark:bg-slate-800 p-1 rounded-2xl flex gap-1">
                        {[
                            { id: "baseline", label: "Traditional", desc: "Standard Build" },
                            { id: "current", label: "Optimized", desc: "Live Config" },
                            { id: "best", label: "Max Green", desc: "Net-Zero Path" }
                        ].map((s) => (
                            <button
                                key={s.id}
                                onClick={() => {
                                    if (s.id === "baseline") setOptimizationBias(0);
                                    if (s.id === "best") setOptimizationBias(1);
                                    setActiveScenario(s.id as any);
                                }}
                                className={`px-5 py-2.5 rounded-xl transition-all text-sm font-semibold flex flex-col items-center ${(s.id === "current" && optimizationBias > 0 && optimizationBias < 1) ||
                                        (s.id === "baseline" && optimizationBias === 0) ||
                                        (s.id === "best" && optimizationBias === 1)
                                        ? "bg-white dark:bg-slate-700 shadow-sm text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <span>{s.label}</span>
                                <span className="text-[9px] opacity-60 uppercase font-bold tracking-tighter">{s.desc}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Control & Summary Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* The Live Engine Control */}
                    <Card className="lg:col-span-4 border-none shadow-2xl shadow-slate-200 shadow-xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                        <CardHeader className="relative">
                            <div className="flex items-center gap-2 mb-1">
                                <Scale className="w-5 h-5 text-primary" />
                                <CardTitle className="text-xl">Cost–Carbon Optimizer</CardTitle>
                            </div>
                            <CardDescription>Adjust bias in real-time to see architectural tradeoffs</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-10 relative">
                            <div className="space-y-6">
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                                    <span className="text-slate-500">Budget Priority</span>
                                    <span className="text-emerald-600">Sustainability Priority</span>
                                </div>
                                <Slider
                                    value={[optimizationBias * 100]}
                                    onValueChange={(v) => setOptimizationBias(v[0] / 100)}
                                    max={100}
                                    step={1}
                                    className="cursor-pointer"
                                />
                                <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/50">
                                    <div className="text-center flex-1 border-r border-slate-200">
                                        <div className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-tighter">Budget Delta</div>
                                        <div className={`text-xl font-black ${costDelta > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                                            {costDelta > 0 ? '+' : ''}{costDelta.toFixed(1)}%
                                        </div>
                                    </div>
                                    <div className="text-center flex-1">
                                        <div className="text-xs text-muted-foreground font-bold mb-1 uppercase tracking-tighter">Carbon Saved</div>
                                        <div className="text-xl font-black text-emerald-500">
                                            {carbonSaving.toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-bold flex items-center gap-2">
                                    <Info className="w-4 h-4 text-primary" />
                                    Active Constraints
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        { label: "Material Sourcing", value: optimizationBias > 0.6 ? "Low-Carbon Optimized" : "Standard Regional" },
                                        { label: "Structural Grid", value: optimizationBias > 0.8 ? "Hybrid Wood/Steel" : "Concrete Reinforced" },
                                        { label: "Incentives", value: "LEED Silver Path" }
                                    ].map((item, i) => (
                                        <li key={i} className="flex justify-between items-center text-xs">
                                            <span className="text-muted-foreground">{item.label}</span>
                                            <span className="font-bold text-slate-800 dark:text-slate-200">{item.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Visual Analytics */}
                    <Card className="lg:col-span-8 border-none shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 border-b">
                            <div>
                                <CardTitle className="text-xl">Embodied Performance Analysis</CardTitle>
                                <CardDescription>Dynamic recalculation based on ICE Database v3.0 coefficients</CardDescription>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-right">
                                    <div className="text-[10px] text-muted-foreground uppercase font-black">Total Embodied</div>
                                    <div className="text-2xl font-black text-slate-900 dark:text-white leading-none">
                                        {Math.round(totalCarbon)} <span className="text-sm text-muted-foreground font-normal">Tons</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] text-muted-foreground uppercase font-black">Estimated Cost</div>
                                    <div className="text-2xl font-black text-slate-900 dark:text-white leading-none">
                                        ${(totalCost / 1000).toFixed(0)}k
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fontWeight: 700 }}
                                            dy={10}
                                        />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    return (
                                                        <div className="bg-white dark:bg-slate-800 p-4 shadow-2xl border-none rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700">
                                                            <p className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-1">{payload[0].payload.name}</p>
                                                            <p className="text-2xl font-black text-primary">{payload[0].value.toFixed(1)} <span className="text-xs font-normal">Tons CO₂e</span></p>
                                                        </div>
                                                    )
                                                }
                                                return null
                                            }}
                                        />
                                        <Bar dataKey="carbon" radius={[12, 12, 0, 0]} barSize={50} animationDuration={1000}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} fillOpacity={index === 1 ? 1 : 0.6} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>

                                <div className="space-y-6 flex flex-col justify-center">
                                    <h4 className="text-[10px] text-muted-foreground uppercase font-black tracking-widest border-l-4 border-primary pl-3">Impact Equivalencies</h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        {equivalents.map((eq, i) => (
                                            <motion.div
                                                key={eq.label}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl flex items-center gap-4 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-default border border-slate-100 dark:border-slate-800"
                                            >
                                                <div className="w-12 h-12 bg-white dark:bg-slate-950 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                                    {eq.label === "Cars Removed" && <Car className="text-blue-500 w-6 h-6" />}
                                                    {eq.label === "Trees Planted" && <TreePine className="text-emerald-500 w-6 h-6" />}
                                                    {eq.label === "Homes Powered" && <Home className="text-amber-500 w-6 h-6" />}
                                                </div>
                                                <div>
                                                    <div className="flex items-baseline gap-1.5 font-black text-xl">
                                                        {eq.value}
                                                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">{eq.unit}</span>
                                                    </div>
                                                    <div className="text-xs font-semibold text-muted-foreground">{eq.label}</div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* AI Insights - Advanced Section */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left: AI Reasoning Summary */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Card className="h-full border-none bg-indigo-600 text-white shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <CardTitle>AI Reasoning Engine</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-indigo-200">Executive Summary</h4>
                                    <p className="text-lg font-medium leading-relaxed italic">
                                        "{apiData.aiData.impactSummary}"
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-indigo-200">Carbon Hotspots</h4>
                                    <div className="space-y-2">
                                        {apiData.aiData.hotspots.map((hs: any, i: number) => (
                                            <div key={i} className="bg-white/10 p-3 rounded-xl flex items-start gap-3">
                                                <AlertCircle className="w-4 h-4 text-rose-300 mt-1 shrink-0" />
                                                <div>
                                                    <div className="font-bold text-sm">{hs.material}</div>
                                                    <div className="text-xs text-indigo-100">{hs.reason}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white/20 p-4 rounded-2xl border border-white/10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                        <div className="text-xs font-bold uppercase tracking-widest">Policy Insight</div>
                                    </div>
                                    <p className="text-xs text-indigo-50 leading-relaxed font-medium">
                                        {apiData.aiData.policyInsight}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Right: Detailed Optimizations (XAI) */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <TrendingDown className="w-6 h-6 text-emerald-500" />
                                Explainable AI (XAI) Tradeoffs
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {apiData.aiData.optimizations.map((opt: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                >
                                    <Card className="border-none shadow-lg hover:shadow-xl transition-all border-l-4 border-emerald-500 group">
                                        <CardContent className="pt-6">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="flex-1 space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-lg font-black group-hover:text-primary transition-colors">{opt.title}</h3>
                                                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-none font-bold">
                                                            -{opt.carbonSavingTons}T CO₂e
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                                        <Zap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                                                            <span className="font-bold text-slate-900 dark:text-white">Action:</span> {opt.action}
                                                        </p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="text-[10px] uppercase font-black text-muted-foreground tracking-widest flex items-center gap-1.5">
                                                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                                            Why it works
                                                        </div>
                                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                                            {opt.technicalExplanation}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="w-full md:w-56 space-y-4 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 bg-slate-50/50 dark:bg-slate-900/50 p-4 rounded-r-2xl">
                                                    <div className="space-y-2">
                                                        <div className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Tradeoff Analysis</div>
                                                        <p className="text-xs font-bold leading-tight">{opt.tradeoff}</p>
                                                    </div>
                                                    <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-4">
                                                        <div>
                                                            <div className="text-[9px] uppercase font-black text-muted-foreground">Budget Impact</div>
                                                            <div className={`text-sm font-black ${opt.costDeltaUsd > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                                                                {opt.costDeltaUsd > 0 ? '+' : ''}${opt.costDeltaUsd.toLocaleString()}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[9px] uppercase font-black text-muted-foreground">Durability</div>
                                                            <div className="text-sm font-black">{opt.durability}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer/CTA */}
                <Card className="border-none shadow-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-8 overflow-hidden relative">
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mb-32 -mr-32" />
                    <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                        <div className="flex-1 space-y-4">
                            <h2 className="text-3xl font-black">Export Technical Specification</h2>
                            <p className="text-slate-300 max-w-xl">
                                Generate a detailed bill of materials (BOM), embodied carbon schedule, and technical justification sheets for procurement and planning approvals.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {["RIBA Stage 3 Ready", "LEED v4.1 Compliant", "ICE 3.0 Indexed"].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                            <Button variant="outline" size="lg" className="rounded-full bg-transparent border-white/20 hover:bg-white/10 text-white h-14 px-8 font-bold">
                                Find Local Suppliers
                            </Button>
                            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white border-none h-14 px-10 font-black shadow-xl shadow-primary/20 text-lg group">
                                Download Full BOM
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </Card>

            </main>
        </div>
    )
}
