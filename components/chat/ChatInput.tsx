"use client"

import { useState, useRef, useEffect, KeyboardEvent } from "react"
import { Send, Paperclip, X, ChevronDown } from "lucide-react"
import { getModeConfig } from "@/lib/modes"
import type { Mode } from "@/lib/types"

const MODELS = [
  { id: "google/gemini-2.0-flash-001", label: "Gemini 2.0 Flash", icon: "⚡" },
  { id: "openai/gpt-4o-mini", label: "GPT-4o Mini", icon: "🤖" },
  { id: "anthropic/claude-3-haiku", label: "Claude 3 Haiku", icon: "🧠" },
  { id: "meta-llama/llama-3.1-8b-instruct:free", label: "Llama 3.1 8B", icon: "🦙" },
]

export function ChatInput({
  onSend,
  disabled,
  mode,
}: {
  onSend: (msg: string, image?: string, model?: string) => void
  disabled?: boolean
  mode: Mode
}) {
  const [value, setValue] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [imageName, setImageName] = useState<string>("")
  const [model, setModel] = useState(MODELS[0].id)
  const [showModels, setShowModels] = useState(false)
  const ref = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const cfg = getModeConfig(mode)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto"
      ref.current.style.height = `${Math.min(ref.current.scrollHeight, 200)}px`
    }
  }, [value])

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed, image ?? undefined, model)
    setValue("")
    setImage(null)
    setImageName("")
    if (ref.current) ref.current.style.height = "auto"
  }

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageName(file.name)
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  const selectedModel = MODELS.find(m => m.id === model) ?? MODELS[0]

  return (
    <div style={{ borderTop: "3px solid #ffc700", background: "white", padding: "12px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        {/* Image preview */}
        {image && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, background: "#f9fafb", borderRadius: 10, padding: "8px 12px", border: "1px solid #e5e7eb" }}>
            <img src={image} alt="upload" style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6 }} />
            <span style={{ fontSize: 12, color: "#374151", flex: 1 }}>{imageName}</span>
            <button onClick={() => { setImage(null); setImageName("") }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}>
              <X size={14} />
            </button>
          </div>
        )}

        {/* Input box */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, background: "#f9f9f9", border: "1px solid #e5e7eb", borderRadius: 16, padding: "10px 14px" }}>
          {/* Attach button */}
          <button onClick={() => fileRef.current?.click()}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4, flexShrink: 0, display: "flex", alignItems: "center" }}
            title="Attach image">
            <Paperclip size={16} />
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />

          <textarea
            ref={ref}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKey}
            placeholder={cfg.placeholder}
            disabled={disabled}
            rows={1}
            style={{ flex: 1, background: "transparent", resize: "none", outline: "none", fontSize: 14, color: "#1a1a1a", lineHeight: 1.6, border: "none", maxHeight: 200, overflowY: "auto", fontFamily: "inherit" }}
          />

          <button onClick={handleSend} disabled={!value.trim() || disabled}
            style={{ width: 34, height: 34, background: value.trim() && !disabled ? "#dc0000" : "#e5e7eb", border: "none", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: value.trim() && !disabled ? "pointer" : "not-allowed", flexShrink: 0, transition: "background 0.15s" }}>
            <Send size={14} color="white" />
          </button>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
          <p style={{ fontSize: 11, color: "#aaa" }}>Enter to send · Shift+Enter for new line</p>

          {/* Model selector */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowModels(!showModels)}
              style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "1px solid #e5e7eb", borderRadius: 8, padding: "4px 8px", fontSize: 11, color: "#374151", cursor: "pointer" }}>
              <span>{selectedModel.icon}</span>
              <span>{selectedModel.label}</span>
              <ChevronDown size={10} />
            </button>

            {showModels && (
              <div style={{ position: "absolute", bottom: "100%", right: 0, marginBottom: 4, background: "white", border: "1px solid #e5e7eb", borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", zIndex: 100, minWidth: 180 }}>
                {MODELS.map(m => (
                  <button key={m.id} onClick={() => { setModel(m.id); setShowModels(false) }}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: model === m.id ? "#fff1f2" : "white", border: "none", cursor: "pointer", fontSize: 12, color: model === m.id ? "#dc0000" : "#374151", textAlign: "left" }}>
                    <span>{m.icon}</span>
                    <span>{m.label}</span>
                    {model === m.id && <span style={{ marginLeft: "auto", color: "#dc0000" }}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
