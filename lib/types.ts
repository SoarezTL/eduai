export type Role = "student" | "educator"

export type Mode = "study" | "math" | "code" | "quiz" | "lesson" | "research"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  mode?: Mode
  createdAt: Date
}

export interface Session {
  id: string
  title: string
  mode: Mode
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}
