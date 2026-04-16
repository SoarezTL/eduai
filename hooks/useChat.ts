"use client"

import { useCallback } from "react"
import { useChatStore } from "@/lib/store"
import type { Mode } from "@/lib/types"

export function useChat() {
  const store = useChatStore()

  const sendMessage = useCallback(async (content: string, image?: string, model?: string, mode?: Mode) => {
    const targetMode = mode ?? store.currentMode
    let sessionId = store.activeSessionId

    if (!sessionId) {
      sessionId = store.createSession(targetMode)
    }

    store.addMessage(sessionId, { role: "user", content, mode: targetMode })
    const placeholder = store.addMessage(sessionId, { role: "assistant", content: "", mode: targetMode })
    store.setStreaming(true)

    const session = useChatStore.getState().sessions.find((s) => s.id === sessionId)
    const messages = (session?.messages ?? [])
      .filter((m) => m.id !== placeholder.id)
      .map((m) => ({ role: m.role, content: m.content }))

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, mode: targetMode, image, model }),
      })

      if (!res.ok || !res.body) throw new Error("Stream failed")

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        for (const line of chunk.split("\n")) {
          if (!line.startsWith("data: ")) continue
          const data = line.slice(6)
          if (data === "[DONE]") break
          try {
            const parsed = JSON.parse(data)
            if (parsed.text) {
              accumulated += parsed.text
              store.updateLastMessage(sessionId!, accumulated)
            }
          } catch { /* skip */ }
        }
      }
    } catch {
      store.updateLastMessage(sessionId!, "Sorry, something went wrong. Please try again.")
    } finally {
      store.setStreaming(false)
    }
  }, [store])

  return {
    sessions:         store.sessions,
    activeSession:    store.getActiveSession(),
    activeSessionId:  store.activeSessionId,
    currentMode:      store.currentMode,
    isStreaming:      store.isStreaming,
    setMode:          store.setMode,
    createSession:    store.createSession,
    setActiveSession: store.setActiveSession,
    clearSession:     store.clearSession,
    deleteSession:    store.deleteSession,
    sendMessage,
  }
}
