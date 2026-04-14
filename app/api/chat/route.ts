import { getModeConfig } from "@/lib/modes"
import { NextRequest } from "next/server"

export const runtime     = "nodejs"
export const maxDuration = 60

export async function POST(req: NextRequest) {
  const { messages, mode = "study" } = await req.json()
  if (!messages || !Array.isArray(messages)) return new Response("Bad request", { status: 400 })

  const cfg = getModeConfig(mode)

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "EduAI",
    },
    body: JSON.stringify({
      model: "openrouter/elephant-alpha",
      stream: true,
      messages: [
        { role: "system", content: cfg.systemPrompt },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    console.error("OpenRouter error:", err)
    return new Response(`API error: ${err}`, { status: 500 })
  }

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      const reader  = response.body!.getReader()
      const decoder = new TextDecoder()
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          for (const line of chunk.split("\n")) {
            if (!line.startsWith("data: ")) continue
            const data = line.slice(6).trim()
            if (data === "[DONE]") break
            try {
              const parsed = JSON.parse(data)
              const text   = parsed.choices?.[0]?.delta?.content
              if (text) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
              }
            } catch { /* skip */ }
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"))
        controller.close()
      } catch (err) { controller.error(err) }
    },
  })

  return new Response(readable, {
    headers: {
      "Content-Type":  "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection":    "keep-alive",
    },
  })
}