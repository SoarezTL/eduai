"use client"

import { useState, useRef, useEffect, KeyboardEvent } from "react"
import { Send } from "lucide-react"
import { getModeConfig } from "@/lib/modes"
import type { Mode } from "@/lib/types"

export function ChatInput({ onSend, disabled, mode }: { onSend: (msg: string) => void; disabled?: boolean; mode: Mode }) {
  const [value, setValue] = useState("")
  const ref = useRef<HTMLTextAreaElement>(null)
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
    onSend(trimmed)
    setValue("")
    if (ref.current) ref.current.style.height = "auto"
  }

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <div style={{borderTop:"3px solid #ffc700",background:"white",padding:"12px 16px"}}>
      <div style={{maxWidth:760,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"flex-end",gap:8,background:"#f9f9f9",border:"1px solid #e5e7eb",borderRadius:16,padding:"10px 14px",transition:"border-color 0.15s"}}>
          <textarea
            ref={ref}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKey}
            placeholder={cfg.placeholder}
            disabled={disabled}
            rows={1}
            style={{flex:1,background:"transparent",resize:"none",outline:"none",fontSize:14,color:"#1a1a1a",lineHeight:1.6,border:"none",maxHeight:200,overflowY:"auto",fontFamily:"inherit"}}
          />
          <button onClick={handleSend} disabled={!value.trim() || disabled}
            style={{width:34,height:34,background:value.trim() && !disabled?"#dc0000":"#e5e7eb",border:"none",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",cursor:value.trim() && !disabled?"pointer":"not-allowed",flexShrink:0,transition:"background 0.15s"}}>
            <Send size={14} color="white" />
          </button>
        </div>
        <p style={{fontSize:11,color:"#aaa",textAlign:"center",marginTop:6}}>
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
