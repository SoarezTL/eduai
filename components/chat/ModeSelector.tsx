"use client"

import { MODES } from "@/lib/modes"
import type { Mode } from "@/lib/types"

export function ModeSelector({ current, onChange }: { current: Mode; onChange: (m: Mode) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, overflowX: "auto", paddingBottom: 2, scrollbarWidth: "none" }}>
      {Object.values(MODES).map((m) => (
        <button
          key={m.id}
          onClick={() => onChange(m.id)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            borderRadius: 999,
            fontSize: "0.875rem",
            fontWeight: 500,
            whiteSpace: "nowrap",
            flexShrink: 0,
            cursor: "pointer",
            border: current === m.id ? "none" : "1px solid #e5e7eb",
            background: current === m.id ? "#dc0000" : "white",
            color: current === m.id ? "white" : "#4b5563",
            transition: "all 0.15s",
          }}
        >
          <span style={{ fontSize: 14 }}>{m.icon}</span>
          {m.label}
        </button>
      ))}
    </div>
  )
}
