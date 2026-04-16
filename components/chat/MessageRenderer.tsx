"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import type { Components } from "react-markdown"

const components: Components = {
  code({ className, children }) {
    const isBlock = className?.includes("language-")
    const lang = className?.replace("language-", "") ?? ""
    if (isBlock) {
      return (
        <div className="my-3">
          {lang && (
            <div className="bg-gray-800 text-gray-400 text-xs px-4 py-1.5 rounded-t-xl font-mono">
              {lang}
            </div>
          )}
          <pre className={`bg-gray-900 text-gray-100 p-4 overflow-x-auto text-xs font-mono leading-relaxed ${lang ? "rounded-b-xl" : "rounded-xl"}`}>
            <code>{children}</code>
          </pre>
        </div>
      )
    }
    return (
      <code className="bg-gray-100 text-red-700 px-1.5 py-0.5 rounded text-xs font-mono">
        {children}
      </code>
    )
  },
  table({ children }) {
    return (
      <div className="overflow-x-auto my-3">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    )
  },
  th({ children }) {
    return <th className="bg-gray-50 border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">{children}</th>
  },
  td({ children }) {
    return <td className="border border-gray-200 px-3 py-2 text-gray-700">{children}</td>
  },
  blockquote({ children }) {
    return <blockquote className="border-l-4 border-red-300 pl-4 italic text-gray-600 my-3">{children}</blockquote>
  },
}

function QuizRenderer({ data }: { data: any }) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const checkAnswer = (q: any, userAnswer: string) => {
    if (q.type === "fill_blank" || q.type === "short_answer") {
      return userAnswer?.toLowerCase().trim() === q.answer?.toLowerCase().trim()
    }
    if (q.type === "true_false") {
      return userAnswer?.toLowerCase() === q.answer?.toLowerCase()
    }
    return userAnswer === q.answer
  }

  const handleSubmit = () => {
    let correct = 0
    data.questions.forEach((q: any) => {
      if (checkAnswer(q, answers[q.id])) correct++
    })
    setScore(correct)
    setSubmitted(true)
  }

  const reset = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
  }

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <div style={{ background: "#dc0000", color: "white", borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>📝 {data.title}</div>
        <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>{data.topic} · {data.questions.length} questions</div>
      </div>

      {submitted && (
        <div style={{ background: score === data.questions.length ? "#dcfce7" : score >= data.questions.length / 2 ? "#fef9c3" : "#fee2e2", borderRadius: 10, padding: "12px 16px", marginBottom: 16, textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>
            {score === data.questions.length ? "🎉 Perfect!" : score >= data.questions.length / 2 ? "👍 Good job!" : "📚 Keep studying!"}
          </div>
          <div style={{ fontSize: 14, marginTop: 4 }}>Score: {score} / {data.questions.length}</div>
        </div>
      )}

      {data.questions.map((q: any, i: number) => {
        const selected = answers[q.id]
        const isCorrect = checkAnswer(q, selected)
        return (
          <div key={q.id} style={{ background: submitted ? (isCorrect ? "#f0fdf4" : "#fff1f2") : "#f9fafb", borderRadius: 10, padding: "12px 14px", marginBottom: 12, border: `1px solid ${submitted ? (isCorrect ? "#86efac" : "#fca5a5") : "#e5e7eb"}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#1a1a1a" }}>
              Q{i + 1}. {q.question}
              <span style={{ fontSize: 11, fontWeight: 400, color: "#888", marginLeft: 8 }}>[{q.difficulty}]</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {q.type === "fill_blank" || q.type === "short_answer" ? (
                <div>
                  <input
                    type="text"
                    disabled={submitted}
                    placeholder="Type your answer..."
                    value={answers[q.id] ?? ""}
                    onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                    style={{ width: "100%", border: `1px solid ${submitted ? (isCorrect ? "#86efac" : "#fca5a5") : "#e5e7eb"}`, borderRadius: 8, padding: "8px 12px", fontSize: 13, outline: "none", background: submitted ? (isCorrect ? "#dcfce7" : "#fee2e2") : "white", boxSizing: "border-box" }}
                  />
                  {submitted && (
                    <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
                      Correct answer: <strong>{q.answer}</strong>
                    </div>
                  )}
                </div>
              ) : q.type === "true_false" ? (
                ["True", "False"].map((opt) => {
                  const isSelected = answers[q.id] === opt
                  const isAnswer = q.answer?.toLowerCase() === opt.toLowerCase()
                  let bg = "white", border = "#e5e7eb", color = "#374151"
                  if (submitted) {
                    if (isAnswer) { bg = "#dcfce7"; border = "#86efac"; color = "#166534" }
                    else if (isSelected && !isAnswer) { bg = "#fee2e2"; border = "#fca5a5"; color = "#991b1b" }
                  } else if (isSelected) { bg = "#fff1f2"; border = "#dc0000"; color = "#dc0000" }
                  return (
                    <button key={opt} disabled={submitted}
                      onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                      style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: "8px 12px", fontSize: 13, color, textAlign: "left", cursor: submitted ? "default" : "pointer" }}>
                      {opt}
                    </button>
                  )
                })
              ) : (
                q.options?.map((opt: string) => {
                  const letter = opt[0]
                  const isSelected = selected === letter
                  const isAnswer = q.answer === letter
                  let bg = "white", border = "#e5e7eb", color = "#374151"
                  if (submitted) {
                    if (isAnswer) { bg = "#dcfce7"; border = "#86efac"; color = "#166534" }
                    else if (isSelected && !isAnswer) { bg = "#fee2e2"; border = "#fca5a5"; color = "#991b1b" }
                  } else if (isSelected) { bg = "#fff1f2"; border = "#dc0000"; color = "#dc0000" }
                  return (
                    <button key={opt} disabled={submitted}
                      onClick={() => setAnswers(prev => ({ ...prev, [q.id]: letter }))}
                      style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: "8px 12px", fontSize: 13, color, textAlign: "left", cursor: submitted ? "default" : "pointer", transition: "all 0.15s" }}>
                      {opt}
                    </button>
                  )
                })
              )}
            </div>

            {submitted && (
              <div style={{ marginTop: 8, fontSize: 12, color: "#555", background: "#f3f4f6", borderRadius: 6, padding: "6px 10px" }}>
                💡 {q.explanation}
              </div>
            )}
          </div>
        )
      })}

      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
        {!submitted ? (
          <button onClick={handleSubmit} disabled={Object.keys(answers).length < data.questions.length}
            style={{ background: Object.keys(answers).length < data.questions.length ? "#e5e7eb" : "#dc0000", color: Object.keys(answers).length < data.questions.length ? "#9ca3af" : "white", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: Object.keys(answers).length < data.questions.length ? "not-allowed" : "pointer" }}>
            Submit Quiz
          </button>
        ) : (
          <button onClick={reset}
            style={{ background: "#dc0000", color: "white", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Try Again
          </button>
        )}
        <span style={{ fontSize: 12, color: "#888", alignSelf: "center" }}>
          {!submitted ? `${Object.keys(answers).length}/${data.questions.length} answered` : ""}
        </span>
      </div>
    </div>
  )
}

function LessonRenderer({ data }: { data: any }) {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <div style={{ background: "#dc0000", color: "white", borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>📖 {data.title}</div>
        <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>
          {data.subject} · Grade {data.gradeLevel} · {data.duration} min
        </div>
      </div>

      {data.objectives && (
        <Section title="🎯 Learning Objectives">
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {data.objectives.map((o: string, i: number) => (
              <li key={i} style={{ fontSize: 13, color: "#374151", marginBottom: 4 }}>{o}</li>
            ))}
          </ul>
        </Section>
      )}

      {data.warmUp && <Section title="🔥 Warm Up"><p style={{ fontSize: 13, color: "#374151", margin: 0 }}>{data.warmUp}</p></Section>}
      {data.mainActivity && <Section title="⚡ Main Activity"><p style={{ fontSize: 13, color: "#374151", margin: 0 }}>{data.mainActivity}</p></Section>}
      {data.practice && <Section title="✏️ Practice"><p style={{ fontSize: 13, color: "#374151", margin: 0 }}>{data.practice}</p></Section>}
      {data.closure && <Section title="🔚 Closure"><p style={{ fontSize: 13, color: "#374151", margin: 0 }}>{data.closure}</p></Section>}
      {data.assessment && <Section title="📊 Assessment"><p style={{ fontSize: 13, color: "#374151", margin: 0 }}>{data.assessment}</p></Section>}

      {data.materials && (
        <Section title="🧰 Materials">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {data.materials.map((m: string, i: number) => (
              <span key={i} style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 6, padding: "3px 10px", fontSize: 12, color: "#374151" }}>{m}</span>
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#f9fafb", borderRadius: 10, padding: "10px 14px", marginBottom: 10, border: "1px solid #e5e7eb" }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", marginBottom: 6 }}>{title}</div>
      {children}
    </div>
  )
}

export function MessageRenderer({ content }: { content: string }) {
  const trimmed = content.trim()
  if (trimmed.startsWith("{")) {
    try {
      const data = JSON.parse(trimmed)
      if (data.questions && Array.isArray(data.questions)) {
        return <QuizRenderer data={data} />
      }
      if (data.objectives || data.warmUp || data.mainActivity) {
        return <LessonRenderer data={data} />
      }
    } catch {
      // not valid JSON, fall through to markdown
    }
  }

  const processed = content
    .replace(/\\\[/g, "$$$$").replace(/\\\]/g, "$$$$")
    .replace(/\\\(/g, "$").replace(/\\\)/g, "$")

  return (
    <div className="prose-chat">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={components}
      >
        {processed}
      </ReactMarkdown>
    </div>
  )
}
