"use client"

import { useEffect, useRef } from "react"
import { Plus, Trash2 } from "lucide-react"
import { useChat } from "@/hooks/useChat"
import type { Mode } from "@/lib/types"
import { ChatMessage }       from "./ChatMessage"
import { ChatInput }         from "./ChatInput"
import { ModeSelector }      from "./ModeSelector"
import { WelcomeScreen }     from "./WelcomeScreen"
import { ThinkingIndicator } from "./ThinkingIndicator"

export function ChatWindow() {
  const { activeSession, currentMode, isStreaming, setMode, createSession, clearSession, sendMessage } = useChat()

  const bottomRef = useRef<HTMLDivElement>(null)
  const messages  = activeSession?.messages ?? []
  const lastMsg   = messages[messages.length - 1]
  const showThink = isStreaming && lastMsg?.role === "assistant" && !lastMsg.content

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length, lastMsg?.content])

  const handleModeChange = (mode: Mode) => {
    setMode(mode)
    createSession(mode)
  }

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",background:"#f9f9f9"}}>
      {/* top bar */}
      <div style={{background:"white",borderBottom:"3px solid #dc0000",padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
        <ModeSelector current={currentMode} onChange={handleModeChange} />
        <div style={{display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
          {activeSession && messages.length > 0 && (
            <button onClick={() => clearSession(activeSession.id)} title="Clear chat"
              style={{background:"none",border:"none",cursor:"pointer",padding:6,borderRadius:8,color:"#999",display:"flex",alignItems:"center"}}>
              <Trash2 size={15} />
            </button>
          )}
          <button onClick={() => createSession(currentMode)} title="New chat"
            style={{background:"none",border:"none",cursor:"pointer",padding:6,borderRadius:8,color:"#666",display:"flex",alignItems:"center"}}>
            <Plus size={15} />
          </button>
        </div>
      </div>

      {/* messages */}
      <div style={{flex:1,overflowY:"auto"}}>
        {messages.length === 0
          ? <WelcomeScreen mode={currentMode} onSuggestion={t => sendMessage(t, undefined, undefined, currentMode)} />
          : (
            <div style={{maxWidth:760,margin:"0 auto",padding:"1.5rem 1rem",display:"flex",flexDirection:"column",gap:20}}>
              {messages.map((msg, i) => (
                <ChatMessage key={msg.id} message={msg}
                  isStreaming={isStreaming && i === messages.length - 1 && msg.role === "assistant"} />
              ))}
              {showThink && <ThinkingIndicator mode={currentMode} />}
              <div ref={bottomRef} />
            </div>
          )
        }
      </div>

      <ChatInput onSend={(t, image, model) => sendMessage(t, image, model, currentMode)} disabled={isStreaming} mode={currentMode} />
    </div>
  )
}
