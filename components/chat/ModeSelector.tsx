"use client"

import { MODES } from "@/lib/modes"
import type { Mode } from "@/lib/types"

export function ModeSelector({ current, onChange }: { current: Mode; onChange: (m: Mode) => void }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-1" style={{ scrollbarWidth: "none" }}>
      {Object.values(MODES).map((m) => (
        <button
          key={m.id}
          onClick={() => onChange(m.id)}
          className={`mode-pill ${current === m.id ? "mode-pill-active" : "mode-pill-inactive"}`}
        >
          <span style={{ fontSize: 14 }}>{m.icon}</span>
          {m.label}
        </button>
      ))}
    </div>
  )
}
