"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, deleteDoc, doc, orderBy } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Leaf,
    Calendar,
    ArrowRight,
    Trash2,
    Building2,
    MapPin,
    Search
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export default function DashboardPage() {
    const { user } = useAuth()
    const router = useRouter()
    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            fetchProjects()
        }
    }, [user])

    const fetchProjects = async () => {
        try {
            const q = query(
                collection(db, "projects"),
                where("userId", "==", user?.uid),
                orderBy("createdAt", "desc")
            )
            const querySnapshot = await getDocs(q)
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setProjects(data)
        } catch (error) {
            console.error("Error fetching projects:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        if (!confirm("Are you sure you want to delete this project?")) return

        try {
            await deleteDoc(doc(db, "projects", id))
            setProjects(prev => prev.filter(p => p.id !== id))
        } catch (error) {
            console.error("Error deleting project:", error)
        }
    }

    const handleViewProject = (project: any) => {
        // Load data into session storage for the results page
        sessionStorage.setItem("analysis-result", JSON.stringify(project.apiData))
        sessionStorage.setItem("analysis-specs", JSON.stringify(project.specs))
        router.push("/results")
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-primary animate-bounce" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
            {/* Header */}
            <header className="border-b bg-background/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Leaf className="text-primary-foreground w-4 h-4" />
                            </div>
                            <span className="font-bold text-lg">GreenBuild AI</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button asChild variant="default" size="sm" className="rounded-full shadow-lg shadow-primary/20">
                            <Link href="/analyze">
                                + New Project
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Your Projects</h1>
                        <p className="text-muted-foreground">Manage and review your sustainability analyses.</p>
                    </div>
                </div>

                {projects.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No projects found</h3>
                        <p className="text-muted-foreground max-w-md mx-auto mb-8">
                            You haven't analyzed any buildings yet. Start your first project to see AI-powered sustainability insights.
                        </p>
                        <Button asChild size="lg" className="rounded-full">
                            <Link href="/analyze">Start Analysis</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <Card
                                key={project.id}
                                className="group hover:shadow-xl transition-all cursor-pointer border-slate-200 dark:border-slate-800 relative overflow-hidden"
                                onClick={() => handleViewProject(project)}
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                                {project.specs.type} Project
                                            </CardTitle>
                                            <CardDescription className="flex items-center gap-2 mt-1">
                                                <MapPin className="w-3 h-3" />
                                                {project.specs.location}
                                            </CardDescription>
                                        </div>
                                        <div className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${project.specs.budget === 'High' ? 'bg-emerald-100 text-emerald-700' :
                                                project.specs.budget === 'Medium' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-slate-100 text-slate-700'
                                            }`}>
                                            {project.specs.budget} Budget
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Building2 className="w-4 h-4" />
                                                <span className="font-medium text-foreground">{project.specs.floors} Floors</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Search className="w-4 h-4" />
                                                <span className="font-medium text-foreground">{parseInt(project.specs.area).toLocaleString()} sq ft</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {project.createdAt?.seconds ? format(new Date(project.createdAt.seconds * 1000), 'MMM d, yyyy') : 'Just now'}
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                    onClick={(e) => handleDelete(e, project.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
