import { GoogleGenerativeAI } from "@google/generative-ai"

let client: GoogleGenerativeAI | null = null

export function getGeminiClient() {
  if (!client) {
    client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  }
  return client
}

export const MODEL      = "gemini-1.5-flash"
export const MAX_TOKENS = 2048