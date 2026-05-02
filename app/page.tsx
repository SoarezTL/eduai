"use client"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Mail, Github, Linkedin, Instagram, Brain, Calculator, Code2, FileText, BookOpen, Search } from "lucide-react"

const LANGUAGES = [
  { id: "en", label: "English", flag: "🇺🇸" },
  { id: "tet", label: "Tetum", flag: "🇹🇱" },
  { id: "pt", label: "Português", flag: "🇵🇹" },
  { id: "id", label: "Indonesia", flag: "🇮🇩" },
  { id: "zh", label: "中文", flag: "🇨🇳" },
  { id: "de", label: "Deutsch", flag: "🇩🇪" },
]

export default function HomePage() {
  const [showLangs, setShowLangs] = useState(false)
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0])

  const handleLanguageChange = (lang: typeof LANGUAGES[0]) => {
    setSelectedLang(lang)
    setShowLangs(false)
    // Save to localStorage so dashboard picks it up
    if (typeof window !== "undefined") {
      localStorage.setItem("eduai-lang", lang.id)
    }
  }

  return (
    <main style={{fontFamily:"system-ui,sans-serif",background:"#fff",color:"#1a1a1a"}}>

      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:50,background:"rgba(255,255,255,0.95)",backdropFilter:"blur(12px)",borderBottom:"3px solid #dc0000",padding:"0 2rem"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,background:"linear-gradient(135deg,#dc0000,#ffc700)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>
              🎓
            </div>
            <span style={{fontWeight:900,fontSize:20,color:"#dc0000"}}>EduAI</span>
            <span style={{fontSize:10,background:"#ffc700",color:"#1a1a1a",padding:"2px 6px",borderRadius:4,fontWeight:700}}>🇹🇱 TL</span>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {["Home","About","Features","Team","Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{color:"#444",textDecoration:"none",padding:"6px 12px",borderRadius:8,fontSize:14,fontWeight:500}}>{item}</a>
            ))}

            {/* Language selector */}
            <div style={{position:"relative"}}>
              <button
                onClick={() => setShowLangs(!showLangs)}
                style={{display:"flex",alignItems:"center",gap:6,background:"#f9f9f9",border:"1px solid #e5e7eb",borderRadius:8,padding:"6px 10px",fontSize:13,fontWeight:600,cursor:"pointer",color:"#374151"}}>
                <span>{selectedLang.flag}</span>
                <span>{selectedLang.label}</span>
                <span style={{fontSize:10}}>▼</span>
              </button>
              {showLangs && (
                <div style={{position:"absolute",top:"100%",right:0,marginTop:4,background:"white",border:"1px solid #e5e7eb",borderRadius:10,boxShadow:"0 4px 12px rgba(0,0,0,0.1)",overflow:"hidden",zIndex:100,minWidth:150}}>
                  {LANGUAGES.map(l => (
                    <button key={l.id} onClick={() => handleLanguageChange(l)}
                      style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:selectedLang.id === l.id ? "#fff1f2" : "white",border:"none",cursor:"pointer",fontSize:13,color:selectedLang.id === l.id ? "#dc0000" : "#374151",textAlign:"left"}}>
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                      {selectedLang.id === l.id && <span style={{marginLeft:"auto",color:"#dc0000"}}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/auth/login" style={{color:"#dc0000",textDecoration:"none",padding:"6px 14px",borderRadius:8,fontSize:14,fontWeight:700}}>Sign in</Link>
            <Link href="/auth/login" style={{background:"#dc0000",color:"white",textDecoration:"none",padding:"8px 18px",borderRadius:10,fontSize:14,fontWeight:700}}>Get Started</Link>
          </div>
        </div>
      </nav>
