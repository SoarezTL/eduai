"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { BookOpen, FileText, Brain, ChevronRight } from "lucide-react"
import { Sidebar } from "@/components/chat/Sidebar"
import { ChatWindow } from "@/components/chat/ChatWindow"

const TOOLS = [
  { icon: FileText, label: "Quiz generator",  desc: "Create quizzes & worksheets",      color: "bg-amber-50 text-amber-600" },
  { icon: BookOpen, label: "Lesson planner",  desc: "Build full lesson plans",           color: "bg-rose-50 text-rose-600" },
  { icon: Brain,    label: "Study materials", desc: "Generate notes & explanations",     color: "bg-brand-50 text-brand-600" },
]

export default function EducatorDashboard() {
  const { user } = useUser()
  const [view, setView] = useState<"home" | "chat">("home")

  if (view === "chat") {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden"><ChatWindow /></main>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.firstName ?? "Educator"} 👋
            </h1>
            <p className="text-gray-500 mt-1">What would you like to create today?</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {TOOLS.map(({ icon: Icon, label, desc, color }) => (
              <button
                key={label}
                onClick={() => setView("chat")}
                className="card p-5 text-left hover:shadow-md transition-shadow group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{label}</h3>
                <p className="text-sm text-gray-500 mb-3">{desc}</p>
                <div className="flex items-center gap-1 text-xs font-medium text-brand-600">
                  Open <ChevronRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
          <div className="card p-6">
            <h2 className="font-semibold text-gray-900 mb-1">Open AI chat</h2>
            <p className="text-sm text-gray-500 mb-4">
              Ask anything — lesson ideas, quiz questions, concept explanations, and more.
            </p>
            <button onClick={() => setView("chat")} className="btn-primary text-sm">
              Start chatting
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
