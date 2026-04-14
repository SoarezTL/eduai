"use client"

import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { Plus, Trash2 } from "lucide-react"
import { useChat } from "@/hooks/useChat"
import { getModeConfig, formatDate } from "@/lib/modes"

export function Sidebar() {
  const { sessions, activeSessionId, currentMode, setActiveSession, createSession, deleteSession } = useChat()

  return (
    <aside style={{width:240,background:"#1a1a1a",display:"flex",flexDirection:"column",height:"100%",flexShrink:0}}>
      {/* logo */}
      <div style={{padding:"1rem",borderBottom:"1px solid #333"}}>
        <Link href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none",marginBottom:12}}>
          <div style={{width:32,height:32,background:"linear-gradient(135deg,#dc0000,#ffc700)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>
            🎓
          </div>
          <span style={{fontWeight:800,fontSize:18,color:"white"}}>EduAI</span>
          <span style={{fontSize:10,background:"#ffc700",color:"#1a1a1a",padding:"2px 6px",borderRadius:4,fontWeight:700}}>TL 🇹🇱</span>
        </Link>
        <button
          onClick={() => createSession(currentMode)}
          style={{width:"100%",background:"#dc0000",color:"white",border:"none",borderRadius:10,padding:"8px 12px",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}
        >
          <Plus size={14} /> New chat
        </button>
      </div>

      {/* history */}
      <div style={{flex:1,overflowY:"auto",padding:"0.75rem"}}>
        {sessions.length === 0
          ? <p style={{color:"#666",fontSize:12,textAlign:"center",padding:"2rem 0"}}>No conversations yet</p>
          : (
            <div>
              <p style={{color:"#666",fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em",padding:"0 8px",marginBottom:8}}>Recent</p>
              {sessions.map((sess) => {
                const cfg = getModeConfig(sess.mode)
                const isActive = sess.id === activeSessionId
                return (
                  <div
                    key={sess.id}
                    onClick={() => setActiveSession(sess.id)}
                    style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",borderRadius:10,cursor:"pointer",marginBottom:2,background:isActive?"#dc0000":"transparent",transition:"background 0.15s"}}
                    onMouseEnter={e => { if(!isActive)(e.currentTarget as HTMLDivElement).style.background="#2a2a2a" }}
                    onMouseLeave={e => { if(!isActive)(e.currentTarget as HTMLDivElement).style.background="transparent" }}
                  >
                    <span style={{fontSize:13,flexShrink:0}}>{cfg.icon}</span>
                    <div style={{flex:1,minWidth:0}}>
                      <p style={{fontSize:12,fontWeight:500,color:"white",margin:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                        {(sess.title?.length > 24 ? sess.title.slice(0,24)+"…" : sess.title) || "New conversation"}
                      </p>
                      <p style={{fontSize:11,color:"#888",margin:0}}>{formatDate(new Date(sess.updatedAt))}</p>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); deleteSession(sess.id) }}
                      style={{background:"none",border:"none",color:"#666",cursor:"pointer",padding:2,borderRadius:4,opacity:0,transition:"opacity 0.15s"}}
                      onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity="1"}
                      onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity="0"}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )
              })}
            </div>
          )
        }
      </div>

      {/* flag strip + user */}
      <div style={{borderTop:"1px solid #333"}}>
        <div style={{display:"flex",height:6}}>
          <div style={{flex:1,background:"#dc0000"}} />
          <div style={{flex:1,background:"#1a1a1a"}} />
          <div style={{flex:1,background:"#ffc700"}} />
        </div>
        <div style={{padding:"0.75rem 1rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <UserButton afterSignOutUrl="/" />
          <span style={{fontSize:11,color:"#666"}}>Timor-Leste 🇹🇱</span>
        </div>
      </div>
    </aside>
  )
}
