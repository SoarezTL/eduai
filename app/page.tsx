"use client"

import { ChatWindow } from "@/components/chat/ChatWindow"
import { Sidebar } from "@/components/chat/Sidebar"

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: "hidden" }}>
        <ChatWindow />
      </main>
    </div>
  )
}
