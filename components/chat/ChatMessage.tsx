"use client"

import { useState } from "react"
import { CheckCircle, XCircle, Target, BookOpen, Layers, ClipboardList, Package } from "lucide-react"
import { formatDate } from "@/lib/modes"
import type { Message } from "@/lib/types"

function tryParseJSON(text: string): unknown | null {
  const raw = text.trim().replace(/^```json\s*/i, "").replace(/\s*```$/, "").trim()
  try { return JSON.parse(raw) } catch { return null }
}

function isQuizJSON(obj: unknown): obj is QuizData {
  return typeof obj === "object" && obj !== null &&
    "questions" in obj && Array.isArray((obj as QuizData).questions)
}

function isLessonJSON(obj: unknown): obj is LessonData {
  return typeof obj === "object" && obj !== null &&
    "objectives" in obj && "mainActivity" in obj
}

interface QuizQuestion {
  id: string
  type: "mcq" | "true_false" | "short_answer" | "fill_blank"
  question: string
  options?: string[]
  answer: string
  explanation: string
  difficulty: "easy" | "medium" | "hard"
}
interface QuizData {
  title: string
  topic: string
  questions: QuizQuestion[]
}
interface LessonData {
  title: string
  subject: string
  gradeLevel: string
  duration: number
  objectives: string[]
  warmUp: string
  mainActivity: string
  practice: string
  closure: string
  assessment: string
  materials: string[]
}

function DifficultyBadge({ level }: { level: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    easy:   { bg: "#dcfce7", color: "#16a34a" },
    medium: { bg: "#fef9c3", color: "#ca8a04" },
    hard:   { bg: "#fee2e2", color: "#dc2626" },
  }
  const s = map[level] ?? map.medium
  return (
    <span style={{ fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: s.bg, color: s.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>
      {level}
    </span>
  )
}

function QuizRenderer({ data }: { data: QuizData }) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const setAnswer = (id: string, val: string) => {
    if (!submitted) setAnswers(prev => ({ ...prev, [id]: val }))
  }

  const score = submitted
    ? data.questions.filter(q => (answers[q.id] ?? "").trim().toLowerCase() === q.answer.trim().toLowerCase()).length
    : 0

  const allAnswered = data.questions.every(q => (answers[q.id] ?? "").trim() !== "")

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* header */}
      <div style={{ background: "linear-gradient(135deg,#dc0000,#ff4444)", borderRadius: 16, padding: "18px 20px", color: "white" }}>
        <p style={{ margin: "0 0 4px", fontSize: "0.75rem", fontWeight: 600, opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Quiz</p>
        <h3 style={{ margin: "0 0 6px", fontWeight: 800, fontSize: "1.1rem" }}>{data.title}</h3>
        <div style={{ display: "flex", gap: 16, fontSize: "0.8rem", opacity: 0.9 }}>
          <span>📚 {data.topic}</span>
          <span>❓ {data.questions.length} questions</span>
        </div>
        {submitted && (
          <div style={{ marginTop: 10, background: "rgba(255,255,255,0.2)", borderRadius: 10, padding: "8px 14px", fontWeight: 700, fontSize: "0.95rem" }}>
            🎯 Score: {score}/{data.questions.length} — {Math.round((score / data.questions.length) * 100)}%
          </div>
        )}
      </div>

      {/* questions */}
      {data.questions.map((q, i) => {
        const userAnswer = answers[q.id] ?? ""
        const isCorrect = submitted && userAnswer.trim().toLowerCase() === q.answer.trim().toLowerCase()
        const isTyped = q.type === "short_answer" || q.type === "fill_blank"

        return (
          <div key={q.id ?? i} style={{ background: "white", borderRadius: 16, border: `1px solid ${submitted ? (isCorrect ? "#16a34a" : "#dc2626") : "#f0f0f0"}`, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            {/* question header */}
            <div style={{ padding: "14px 18px", borderBottom: "1px solid #f5f5f5", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flex: 1 }}>
                <span style={{ width: 26, height: 26, borderRadius: 8, background: "#dc000015", color: "#dc0000", fontWeight: 800, fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  {i + 1}
                </span>
                <p style={{ margin: 0, fontWeight: 600, color: "#1a1a1a", fontSize: "0.9rem", lineHeight: 1.5 }}>{q.question}</p>
              </div>
              <DifficultyBadge level={q.difficulty} />
            </div>

            <div style={{ padding: "12px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
              {/* MCQ / true_false */}
              {q.options && q.options.map((opt) => {
                const isSelected = userAnswer === opt
                const isAnswer = opt === q.answer
                let bg = "white", border = "#e5e7eb", color = "#374151"
                if (submitted) {
                  if (isAnswer) { bg = "#dcfce7"; border = "#16a34a"; color = "#15803d" }
                  else if (isSelected) { bg = "#fee2e2"; border = "#dc2626"; color = "#dc2626" }
                } else if (isSelected) {
                  bg = "#fff5f5"; border = "#dc0000"; color = "#dc0000"
                }
                return (
                  <button key={opt} onClick={() => setAnswer(q.id, opt)}
                    style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 10, padding: "9px 14px", textAlign: "left", cursor: submitted ? "default" : "pointer", color, fontSize: "0.875rem", fontWeight: isSelected ? 600 : 400, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, transition: "all 0.15s" }}>
                    <span>{opt}</span>
                    {submitted && isAnswer && <CheckCircle size={16} />}
                    {submitted && isSelected && !isAnswer && <XCircle size={16} />}
                  </button>
                )
              })}

              {/* short_answer / fill_blank */}
              {isTyped && (
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  placeholder={q.type === "fill_blank" ? "Type your answer..." : "Write your answer..."}
                  disabled={submitted}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${submitted ? (isCorrect ? "#16a34a" : "#dc2626") : "#e5e7eb"}`, fontSize: "0.875rem", color: "#1a1a1a", background: submitted ? (isCorrect ? "#dcfce7" : "#fee2e2") : "white", outline: "none", transition: "all 0.15s" }}
                />
              )}

              {/* result after submit */}
              {submitted && (
                <div style={{ padding: "10px 14px", borderRadius: 10, background: isCorrect ? "#dcfce7" : "#fee2e2", color: isCorrect ? "#15803d" : "#dc2626", fontSize: "0.875rem" }}>
                  <span style={{ fontWeight: 700 }}>{isCorrect ? "✅ Correct!" : `❌ Wrong — Answer: ${q.answer}`}</span>
                  <p style={{ margin: "4px 0 0", fontWeight: 400, fontSize: "0.8rem" }}>💡 {q.explanation}</p>
                </div>
              )}
            </div>
          </div>
        )
      })}

      {/* single submit button */}
      {!submitted && (
        <button
          onClick={() => setSubmitted(true)}
          disabled={!allAnswered}
          style={{ background: allAnswered ? "#dc0000" : "#f3f4f6", color: allAnswered ? "white" : "#9ca3af", border: "none", borderRadius: 12, padding: "14px 20px", fontWeight: 700, fontSize: "1rem", cursor: allAnswered ? "pointer" : "not-allowed", transition: "all 0.15s" }}>
          {allAnswered ? "Submit Quiz" : `Answer all questions to submit (${Object.keys(answers).length}/${data.questions.length})`}
        </button>
      )}
    </div>
  )
}

function LessonSection({ icon, title, content, color }: { icon: React.ReactNode; title: string; content: string; color: string }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: "1px solid #f5f5f5" }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: `${color}15`, color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: "0 0 4px", fontSize: "0.75rem", fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</p>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#374151", lineHeight: 1.6 }}>{content}</p>
      </div>
    </div>
  )
}

function LessonRenderer({ data }: { data: LessonData }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <div style={{ background: "linear-gradient(135deg,#be123c,#dc0000)", borderRadius: 16, padding: "20px 22px", color: "white", marginBottom: 12 }}>
        <p style={{ margin: "0 0 4px", fontSize: "0.75rem", fontWeight: 600, opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Lesson Plan</p>
        <h3 style={{ margin: "0 0 10px", fontWeight: 800, fontSize: "1.1rem", lineHeight: 1.3 }}>{data.title}</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, fontSize: "0.8rem", opacity: 0.9 }}>
          <span>📖 {data.subject}</span>
          <span>🎓 Grade {data.gradeLevel}</span>
          <span>⏱ {data.duration} min</span>
        </div>
      </div>
      <div style={{ background: "white", borderRadius: 16, border: "1px solid #f0f0f0", padding: "16px 18px", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "#fef9c3", color: "#ca8a04", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Target size={16} />
          </div>
          <p style={{ margin: 0, fontSize: "0.75rem", fontWeight: 700, color: "#ca8a04", textTransform: "uppercase", letterSpacing: "0.05em" }}>Learning Objectives</p>
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
          {data.objectives.map((obj, i) => (
            <li key={i} style={{ fontSize: "0.875rem", color: "#374151", lineHeight: 1.5 }}>{obj}</li>
          ))}
        </ul>
      </div>
      <div style={{ background: "white", borderRadius: 16, border: "1px solid #f0f0f0", padding: "4px 18px", marginBottom: 8 }}>
        <LessonSection icon={<BookOpen size={16} />} title="Warm-Up" content={data.warmUp} color="#2563eb" />
        <LessonSection icon={<Layers size={16} />} title="Main Activity" content={data.mainActivity} color="#dc0000" />
        <LessonSection icon={<ClipboardList size={16} />} title="Practice" content={data.practice} color="#16a34a" />
        <LessonSection icon={<Target size={16} />} title="Closure" content={data.closure} color="#9333ea" />
        <LessonSection icon={<CheckCircle size={16} />} title="Assessment" content={data.assessment} color="#ca8a04" />
      </div>
      {data.materials?.length > 0 && (
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #f0f0f0", padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Package size={16} />
            </div>
            <p style={{ margin: 0, fontSize: "0.75rem", fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.05em" }}>Materials Needed</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {data.materials.map((m, i) => (
              <span key={i} style={{ background: "#f0fdf4", color: "#15803d", fontSize: "0.8rem", fontWeight: 500, padding: "4px 10px", borderRadius: 999, border: "1px solid #bbf7d0" }}>{m}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MarkdownText({ content }: { content: string }) {
  return (
    <div className="prose-chat" dangerouslySetInnerHTML={{
      __html: content
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => `<pre><code class="lang-${lang}">${code.trim()}</code></pre>`)
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\*([^*]+)\*/g, "<em>$1</em>")
        .replace(/^### (.+)$/gm, "<h3>$1</h3>")
        .replace(/^## (.+)$/gm, "<h2>$1</h2>")
        .replace(/^# (.+)$/gm, "<h1>$1</h1>")
        .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
        .replace(/^[-*] (.+)$/gm, "<li>$1</li>")
        .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
        .replace(/(<li>[\s\S]*?<\/li>)(\n<li>[\s\S]*?<\/li>)*/g, (match) => `<ul>${match}</ul>`)
        .replace(/\n\n(?!<)/g, "</p><p>")
        .replace(/^(?!<)/, "<p>")
        .replace(/(?<!>)$/, "</p>")
        .replace(/\n(?!<)/g, "<br>"),
    }} />
  )
}

interface ChatMessageProps {
  message: Message
  isStreaming?: boolean
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user"

  const renderContent = () => {
    if (isUser) return <p style={{ margin: 0, fontSize: "0.875rem", lineHeight: 1.6 }}>{message.content}</p>
    const parsed = tryParseJSON(message.content)
    if (isQuizJSON(parsed)) return <QuizRenderer data={parsed} />
    if (isLessonJSON(parsed)) return <LessonRenderer data={parsed} />
    return <MarkdownText content={message.content} />
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: isUser ? "flex-end" : "flex-start", gap: 4 }}>
      <div style={{
        maxWidth: isUser ? "72%" : "100%",
        width: isUser ? undefined : "100%",
        background: isUser ? "#dc0000" : "white",
        color: isUser ? "white" : "#1a1a1a",
        borderRadius: isUser ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
        padding: isUser ? "10px 16px" : "14px 16px",
        border: isUser ? "none" : "1px solid #f0f0f0",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      }}>
        {renderContent()}
        {isStreaming && (
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#dc0000", marginLeft: 4, animation: "pulse 1s infinite" }} />
        )}
      </div>
      <span style={{ fontSize: "0.7rem", color: "#9ca3af", padding: "0 4px" }}>
        {formatDate(new Date(message.createdAt ?? Date.now()))}
      </span>
    </div>
  )
}
