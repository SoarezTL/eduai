"use client"

import { useState, useRef, useEffect, KeyboardEvent } from "react"
import { Send, Paperclip, X, ChevronDown, Camera } from "lucide-react"
import { getModeConfig } from "@/lib/modes"
import type { Mode, Language } from "@/lib/types"

const MODELS = [
  { id: "google/gemini-2.0-flash-001", label: "Gemini 2.0 Flash", icon: "⚡" },
  { id: "openai/gpt-4o-mini", label: "GPT-4o Mini", icon: "🤖" },
  { id: "anthropic/claude-3-haiku", label: "Claude 3 Haiku", icon: "🧠" },
  { id: "meta-llama/llama-3.1-8b-instruct:free", label: "Llama 3.1 8B", icon: "🦙" },
]

const LANGUAGES: { id: Language; label: string; flag: string }[] = [
  { id: "en", label: "English", flag: "🇺🇸" },
  { id: "tet", label: "Tetum", flag: "🇹🇱" },
  { id: "pt", label: "Português", flag: "🇵🇹" },
  { id: "id", label: "Indonesia", flag: "🇮🇩" },
  { id: "zh", label: "中文", flag: "🇨🇳" },
  { id: "de", label: "Deutsch", flag: "🇩🇪" }, 
]

export function ChatInput({
  onSend,
  disabled,
  mode,
  language,
  onLanguageChange,
}: {
  onSend: (msg: string, image?: string, model?: string) => void
  disabled?: boolean
  mode: Mode
  language: Language
  onLanguageChange: (lang: Language) => void
}) {
  const [value, setValue] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [imageName, setImageName] = useState<string>("")
  const [model, setModel] = useState(MODELS[0].id)
  const [showModels, setShowModels] = useState(false)
  const [showLangs, setShowLangs] = useState(false)
  const ref = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)
  const cfg = getModeConfig(mode)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto"
      ref.current.style.height = `${Math.min(ref.current.scrollHeight, 200)}px`
    }
  }, [value])

  const handleSend = () => {
    const trimmed = value.trim()
    if ((!trimmed && !image) || disabled) return
    onSend(trimmed || "Please solve this.", image ?? undefined, model)
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

  const isImageFile = (name: string) => name.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  const getFileIcon = (name: string) => {
    if (name.endsWith(".pdf")) return "📄"
    if (name.endsWith(".doc") || name.endsWith(".docx")) return "📝" 
    return "📎"
  }

  const selectedModel = MODELS.find(m => m.id === model) ?? MODELS[0]
  const selectedLang = LANGUAGES.find(l => l.id === language) ?? LANGUAGES[0]

  return (
    <div style={{ borderTop: "3px solid #ffc700", background: "white", padding: "12px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        {/* File preview */}
        {image && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, background: "#f9fafb", borderRadius: 10, padding: "8px 12px", border: "1px solid #e5e7eb" }}>
            {isImageFile(imageName) ? (
              <img src={image} alt="upload" style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 8, border: "2px solid #dc0000" }} />
            ) : (
              <div style={{ width: 40, height: 40, background: "#fee2e2", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                {getFileIcon(imageName)}
              </div>
            )}
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 12, color: "#374151", fontWeight: 600 }}>{imageName}</p>
              {mode === "photo" && <p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>Ready to solve — add a question or just send</p>}
            </div>
            <button onClick={() => { setImage(null); setImageName("") }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}>
              <X size={14} />
            </button>
          </div>
        )}

        {/* Photo mode banner */}
        {mode === "photo" && !image && (
          <div style={{ marginBottom: 8, background: "#f0fdfa", border: "1px dashed #14b8a6", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>📸</span>
            <p style={{ margin: 0, fontSize: 12, color: "#0f766e", fontWeight: 500 }}>Upload a photo of your homework, textbook, or whiteboard and I'll solve it!</p>
          </div>
        )}

        {/* Input box */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, background: "#f9f9f9", border: "1px solid #e5e7eb", borderRadius: 16, padding: "10px 14px" }}>
          <button onClick={() => fileRef.current?.click()}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4, flexShrink: 0, display: "flex", alignItems: "center" }}
            title="Attach file">
            <Paperclip size={16} />
          </button>
          <input ref={fileRef} type="file" accept="image/*,.pdf,.doc,.docx,.txt" onChange={handleFile} style={{ display: "none" }} />

          {mode === "photo" && (
            <>
              <button onClick={() => cameraRef.current?.click()}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#14b8a6", padding: 4, flexShrink: 0, display: "flex", alignItems: "center" }}
                title="Take photo">
                <Camera size={16} />
              </button>
              <input ref={cameraRef} type="file" accept="image/*" capture="environment" onChange={handleFile} style={{ display: "none" }} />
            </>
          )}

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

          <button onClick={handleSend} disabled={(!value.trim() && !image) || disabled}
            style={{ width: 34, height: 34, background: (value.trim() || image) && !disabled ? "#dc0000" : "#e5e7eb", border: "none", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: (value.trim() || image) && !disabled ? "pointer" : "not-allowed", flexShrink: 0, transition: "background 0.15s" }}>
            <Send size={14} color="white" />
          </button>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6, gap: 8 }}>
          <p style={{ fontSize: 11, color: "#aaa", flexShrink: 0 }}>Enter to send · Shift+Enter for new line</p>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>

            {/* Language selector */}
            <div style={{ position: "relative" }}>
              <button onClick={() => { setShowLangs(!showLangs); setShowModels(false) }}
                style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "1px solid #e5e7eb", borderRadius: 8, padding: "4px 8px", fontSize: 11, color: "#374151", cursor: "pointer" }}>
                <span>{selectedLang.flag}</span>
                <span>{selectedLang.label}</span>
                <ChevronDown size={10} />
              </button>
              {showLangs && (
                <div style={{ position: "absolute", bottom: "100%", right: 0, marginBottom: 4, background: "white", border: "1px solid #e5e7eb", borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden", zIndex: 100, minWidth: 150 }}>
                  {LANGUAGES.map(l => (
                    <button key={l.id} onClick={() => { onLanguageChange(l.id); setShowLangs(false) }}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: language === l.id ? "#fff1f2" : "white", border: "none", cursor: "pointer", fontSize: 12, color: language === l.id ? "#dc0000" : "#374151", textAlign: "left" }}>
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                      {language === l.id && <span style={{ marginLeft: "auto", color: "#dc0000" }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Model selector */}
            <div style={{ position: "relative" }}>
              <button onClick={() => { setShowModels(!showModels); setShowLangs(false) }}
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
    </div>
  )
}
