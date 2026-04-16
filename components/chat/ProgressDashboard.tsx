"use client"

import { useChatStore } from "@/lib/store"
import type { Mode } from "@/lib/types"

const MODE_COLORS: Record<Mode, string> = {
  study: "#3b82f6",
  math: "#8b5cf6",
  code: "#10b981",
  quiz: "#f59e0b",
  lesson: "#ec4899",
  research: "#06b6d4",
}

const MODE_ICONS: Record<Mode, string> = {
  study: "📚",
  math: "➗",
  code: "💻",
  quiz: "📝",
  lesson: "📖",
  research: "🔬",
}

export function ProgressDashboard({ onClose }: { onClose: () => void }) {
  const { progress, sessions } = useChatStore()

  const modeCounts = sessions.reduce((acc, s) => {
    acc[s.mode] = (acc[s.mode] ?? 0) + 1
    return acc
  }, {} as Record<Mode, number>)

  const totalMessages = sessions.reduce((acc, s) => acc + s.messages.filter(m => m.role === "user").length, 0)
  const totalSessions = sessions.length
  const topicsByMode = progress.topics.reduce((acc, t) => {
    if (!acc[t.mode]) acc[t.mode] = []
    acc[t.mode].push(t.topic)
    return acc
  }, {} as Record<Mode, string[]>)

  const avgQuizScore = progress.quizScores.length > 0
    ? Math.round(progress.quizScores.reduce((acc, q) => acc + (q.score / q.total) * 100, 0) / progress.quizScores.length)
    : null

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "white", borderRadius: 16, width: "100%", maxWidth: 600, maxHeight: "85vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        
        {/* Header */}
        <div style={{ background: "#dc0000", color: "white", borderRadius: "16px 16px 0 0", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>📊 Learning Progress</div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>Track your study journey</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, color: "white", width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>

        <div style={{ padding: 20 }}>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
            {[
              { label: "Total Sessions", value: totalSessions, icon: "💬" },
              { label: "Questions Asked", value: totalMessages, icon: "❓" },
              { label: "Avg Quiz Score", value: avgQuizScore !== null ? `${avgQuizScore}%` : "—", icon: "🎯" },
            ].map((stat) => (
              <div key={stat.label} style={{ background: "#f9fafb", borderRadius: 10, padding: "12px", textAlign: "center", border: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 22 }}>{stat.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#dc0000", marginTop: 4 }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mode usage */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", marginBottom: 10 }}>📱 Mode Usage</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {(Object.keys(MODE_ICONS) as Mode[]).map((mode) => {
                const count = modeCounts[mode] ?? 0
                const max = Math.max(...Object.values(modeCounts), 1)
                const pct = Math.round((count / max) * 100)
                return (
                  <div key={mode} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, textAlign: "center" }}>{MODE_ICONS[mode]}</div>
                    <div style={{ width: 60, fontSize: 12, color: "#374151", textTransform: "capitalize" }}>{mode}</div>
                    <div style={{ flex: 1, background: "#f3f4f6", borderRadius: 4, height: 8, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: MODE_COLORS[mode], borderRadius: 4, transition: "width 0.5s" }} />
                    </div>
                    <div style={{ width: 24, fontSize: 12, color: "#6b7280", textAlign: "right" }}>{count}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recent topics */}
          {progress.topics.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", marginBottom: 10 }}>🗂️ Recent Topics</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {progress.topics.slice(0, 20).map((t, i) => (
                  <span key={i} style={{ background: `${MODE_COLORS[t.mode]}18`, border: `1px solid ${MODE_COLORS[t.mode]}40`, borderRadius: 20, padding: "4px 12px", fontSize: 12, color: MODE_COLORS[t.mode], fontWeight: 500 }}>
                    {MODE_ICONS[t.mode]} {t.topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quiz scores */}
          {progress.quizScores.length > 0 && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", marginBottom: 10 }}>🏆 Quiz History</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {progress.quizScores.slice(0, 5).map((q, i) => {
                  const pct = Math.round((q.score / q.total) * 100)
                  return (
                    <div key={i} style={{ background: "#f9fafb", borderRadius: 8, padding: "10px 12px", border: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{q.topic}</div>
                        <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{new Date(q.date).toLocaleDateString()}</div>
                      </div>
                      <div style={{ background: pct >= 80 ? "#dcfce7" : pct >= 60 ? "#fef9c3" : "#fee2e2", borderRadius: 8, padding: "4px 10px", fontSize: 13, fontWeight: 700, color: pct >= 80 ? "#166534" : pct >= 60 ? "#854d0e" : "#991b1b" }}>
                        {q.score}/{q.total} ({pct}%)
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {progress.topics.length === 0 && progress.quizScores.length === 0 && (
            <div style={{ textAlign: "center", padding: "30px 0", color: "#9ca3af" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🌱</div>
              <div style={{ fontSize: 14 }}>Start studying to track your progress!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
