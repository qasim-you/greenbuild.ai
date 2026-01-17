"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    MessageCircle,
    X,
    Send,
    Leaf,
    Sparkles,
    User,
    Loader2,
    Minimize2,
    Maximize2
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: Date
}

const SUGGESTED_QUESTIONS = [
    "What is embodied carbon?",
    "How can I reduce my building's carbon footprint?",
    "What are the best sustainable materials?",
    "Tell me about LEED certification",
]

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Hi! I'm your GreenBuild AI Assistant 🌱 I'm here to help you make sustainable construction decisions. Ask me anything about materials, carbon footprints, or green building practices!",
            timestamp: new Date()
        }
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen && !isMinimized) {
            inputRef.current?.focus()
        }
    }, [isOpen, isMinimized])

    const sendMessage = async (messageText?: string) => {
        const textToSend = messageText || input.trim()
        if (!textToSend || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: textToSend,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: textToSend,
                    history: messages.slice(-6).map(m => ({ role: m.role, content: m.content }))
                })
            })

            const data = await response.json()

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.message || "I couldn't process that. Please try again!",
                timestamp: new Date()
            }

            setMessages(prev => [...prev, assistantMessage])
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Sorry, I'm having connection issues. Please try again! 🔄",
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <>
            {/* Floating Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-2xl shadow-emerald-500/30 flex items-center justify-center text-white hover:shadow-emerald-500/50 transition-shadow"
                    >
                        <MessageCircle className="w-7 h-7" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full animate-pulse" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: isMinimized ? "auto" : "600px"
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-50 w-[380px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                    <Leaf className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">GreenBuild AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
                                        <span className="text-[10px] text-emerald-100 font-medium">Online • Ready to help</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    {isMinimized ? (
                                        <Maximize2 className="w-4 h-4 text-white" />
                                    ) : (
                                        <Minimize2 className="w-4 h-4 text-white" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        {!isMinimized && (
                            <>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
                                    {messages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                        >
                                            {msg.role === "assistant" && (
                                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shrink-0">
                                                    <Sparkles className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                            <div
                                                className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                                        ? "bg-emerald-500 text-white rounded-br-md"
                                                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-md shadow-sm border border-slate-100 dark:border-slate-700"
                                                    }`}
                                            >
                                                {msg.content}
                                            </div>
                                            {msg.role === "user" && (
                                                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center shrink-0">
                                                    <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}

                                    {isLoading && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex gap-3"
                                        >
                                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                                                <Sparkles className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-bl-md shadow-sm border border-slate-100 dark:border-slate-700">
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                                                    <span className="text-sm text-slate-400">Thinking...</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Suggested Questions (show only at start) */}
                                {messages.length === 1 && (
                                    <div className="px-4 pb-2 bg-slate-50 dark:bg-slate-950">
                                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">Quick Questions</p>
                                        <div className="flex flex-wrap gap-2">
                                            {SUGGESTED_QUESTIONS.map((q, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => sendMessage(q)}
                                                    className="text-xs px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:border-emerald-400 hover:text-emerald-600 transition-colors"
                                                >
                                                    {q}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Input Area */}
                                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex gap-2">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Ask about sustainability..."
                                            disabled={isLoading}
                                            className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 placeholder:text-slate-400"
                                        />
                                        <Button
                                            onClick={() => sendMessage()}
                                            disabled={!input.trim() || isLoading}
                                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50"
                                        >
                                            <Send className="w-5 h-5" />
                                        </Button>
                                    </div>
                                    <p className="text-[10px] text-center text-slate-400 mt-2">
                                        Powered by GreenBuild AI • Ask anything about sustainable construction
                                    </p>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
