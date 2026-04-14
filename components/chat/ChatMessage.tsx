"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { getModeConfig, formatDate } from "@/lib/modes"
import type { Message } from "@/lib/types"
import { MessageRenderer } from "./MessageRenderer"

export function ChatMessage({ message, isStreaming }: { message: Message; isStreaming?: boolean }) {
  const { user } = useUser()
  const [copied, setCopied] = useState(false)
  const cfg    = getModeConfig(message.mode ?? "study")
  const isUser = message.role === "user"

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isUser) {
    return (
      <div style={{display:"flex",alignItems:"flex-start",gap:10,justifyContent:"flex-end"}} className="animate-slide-up">
        <div style={{maxWidth:"80%"}}>
          <div style={{background:"#dc0000",color:"white",borderRadius:"16px 16px 4px 16px",padding:"10px 14px",fontSize:14,lineHeight:1.6}}>
            {message.content}
          </div>
          <p style={{fontSize:11,color:"#999",marginTop:4,textAlign:"right"}}>{formatDate(new Date(message.createdAt))}</p>
        </div>
        <div style={{width:32,height:32,borderRadius:"50%",background:"#ffc700",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:12,fontWeight:700,color:"#1a1a1a"}}>
          {user?.firstName?.[0] ?? "U"}
        </div>
      </div>
    )
  }

  return (
    <div style={{display:"flex",alignItems:"flex-start",gap:10}} className="animate-slide-up">
      <div style={{width:32,height:32,borderRadius:"50%",background:"#fff8e1",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:14,border:"2px solid #ffc700"}}>
        {cfg.icon}
      </div>
      <div style={{maxWidth:"85%",flex:1}}>
        <div style={{background:"white",border:"1px solid #f0f0f0",borderRadius:"4px 16px 16px 16px",borderLeft:"3px solid #dc0000",padding:"10px 14px",position:"relative"}}>
          {message.content
            ? <MessageRenderer content={message.content} />
            : <span style={{color:"#999",fontSize:13,fontStyle:"italic"}}>Thinking...</span>
          }
          {isStreaming && message.content && (
            <span style={{display:"inline-block",width:2,height:14,background:"#dc0000",animation:"thinkPulse 1s infinite",marginLeft:2,verticalAlign:"middle"}} />
          )}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12,marginTop:4}}>
          <p style={{fontSize:11,color:"#999"}}>{formatDate(new Date(message.createdAt))}</p>
          {!isStreaming && message.content && (
            <button onClick={handleCopy}
              style={{fontSize:11,color:"#999",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:4,padding:0}}>
              {copied ? <><Check size={11}/> Copied</> : <><Copy size={11}/> Copy</>}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
