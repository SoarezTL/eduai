import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Message, Mode, Session, ProgressState } from "@/lib/types"
import { generateId } from "@/lib/modes"

interface ChatState {
  sessions: Session[]
  activeSessionId: string | null
  currentMode: Mode
  isStreaming: boolean
  progress: ProgressState
  setMode: (mode: Mode) => void
  createSession: (mode: Mode) => string
  setActiveSession: (id: string) => void
  getActiveSession: () => Session | null
  addMessage: (sessionId: string, msg: Omit<Message, "id" | "createdAt">) => Message
  updateLastMessage: (sessionId: string, content: string) => void
  setStreaming: (v: boolean) => void
  clearSession: (sessionId: string) => void
  deleteSession: (sessionId: string) => void
  addTopic: (topic: string, mode: Mode) => void
  addQuizScore: (topic: string, score: number, total: number) => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      sessions: [],
      activeSessionId: null,
      currentMode: "study",
      isStreaming: false,
      progress: { topics: [], quizScores: [] },

      setMode: (mode) => set({ currentMode: mode }),

      createSession: (mode) => {
        const id = generateId()
        const session: Session = {
          id, mode,
          title: "New conversation",
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        set((s) => ({ sessions: [session, ...s.sessions], activeSessionId: id }))
        return id
      },

      setActiveSession: (id) => set({ activeSessionId: id }),

      getActiveSession: () => {
        const { sessions, activeSessionId } = get()
        return sessions.find((s) => s.id === activeSessionId) ?? null
      },

      addMessage: (sessionId, msgData) => {
        const msg: Message = { ...msgData, id: generateId(), createdAt: new Date() }
        set((s) => ({
          sessions: s.sessions.map((sess) =>
            sess.id !== sessionId ? sess : {
              ...sess,
              messages: [...sess.messages, msg],
              updatedAt: new Date(),
              title: sess.messages.length === 0 && msgData.role === "user"
                ? msgData.content.slice(0, 50) : sess.title,
            }
          ),
        }))
        return msg
      },

      updateLastMessage: (sessionId, content) => {
        set((s) => ({
          sessions: s.sessions.map((sess) => {
            if (sess.id !== sessionId) return sess
            const msgs = [...sess.messages]
            const last = msgs[msgs.length - 1]
            if (last?.role === "assistant") msgs[msgs.length - 1] = { ...last, content }
            return { ...sess, messages: msgs }
          }),
        }))
      },

      setStreaming: (v) => set({ isStreaming: v }),

      clearSession: (sessionId) => set((s) => ({
        sessions: s.sessions.map((sess) =>
          sess.id === sessionId ? { ...sess, messages: [], updatedAt: new Date() } : sess
        ),
      })),

      deleteSession: (sessionId) => set((s) => ({
        sessions: s.sessions.filter((sess) => sess.id !== sessionId),
        activeSessionId: s.activeSessionId === sessionId ? null : s.activeSessionId,
      })),

      addTopic: (topic, mode) => set((s) => ({
        progress: {
          ...s.progress,
          topics: [
            { topic, mode, studiedAt: new Date() },
            ...s.progress.topics.filter(t => t.topic !== topic || t.mode !== mode),
          ].slice(0, 50),
        }
      })),

      addQuizScore: (topic, score, total) => set((s) => ({
        progress: {
          ...s.progress,
          quizScores: [
            { topic, score, total, date: new Date() },
            ...s.progress.quizScores,
          ].slice(0, 50),
        }
      })),
    }),
    {
      name: "eduai-chat",
      partialize: (s) => ({
        sessions: s.sessions.slice(0, 20),
        currentMode: s.currentMode,
        progress: s.progress,
      }),
    }
  )
)
