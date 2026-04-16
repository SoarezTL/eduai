import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { ChatWindow } from "@/components/chat/ChatWindow"
import { Sidebar } from "@/components/chat/Sidebar"

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) redirect("/auth/login")

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: "hidden" }}>
        <ChatWindow />
      </main>
    </div>
  )
}
