"use client"

import { MODES } from "@/lib/modes"
import type { Mode } from "@/lib/types"

const SUGGESTIONS: Record<Mode, string[]> = {
  study:    ["Explain photosynthesis simply", "What caused World War I?", "Help me understand Newton's laws", "Difference between DNA and RNA?"],
  math:     ["Solve: 3x² + 5x - 2 = 0", "Explain integration by parts", "Find the derivative of sin(x²)", "What is the Pythagorean theorem?"],
  code:     ["Explain recursion with an example", "How does async/await work in JS?", "What is a linked list?", "Debug my Python code"],
  quiz:     ["5 MCQs on photosynthesis", "Quiz on World War II — medium", "10 math questions for grade 8", "Quiz me on Python basics"],
  lesson:   ["Fractions for grade 5, 45 mins", "Lesson on Shakespeare's Hamlet", "Intro to coding for beginners", "Climate change for high school"],
  research: ["Summarize this paper for me", "Explain quantum entanglement simply", "What is CRISPR gene editing?", "What is dark matter?"],
}

export function WelcomeScreen({ mode, onSuggestion }: { mode: Mode; onSuggestion: (t: string) => void }) {
  const cfg         = MODES[mode]
  const suggestions = SUGGESTIONS[mode]

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",padding:"3rem 1rem",textAlign:"center"}}>
      <div style={{width:72,height:72,borderRadius:20,background:"#fff8e1",border:"3px solid #ffc700",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,marginBottom:16}}>
        {cfg.icon}
      </div>
      <h2 style={{fontWeight:800,fontSize:"1.25rem",color:"#1a1a1a",marginBottom:6}}>{cfg.label} mode</h2>
      <p style={{color:"#888",fontSize:14,maxWidth:320,marginBottom:32,lineHeight:1.6}}>{cfg.description}</p>

      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,width:"100%",maxWidth:520}}>
        {suggestions.map(s => (
          <button key={s} onClick={() => onSuggestion(s)}
            style={{textAlign:"left",padding:"10px 14px",background:"white",border:"1px solid #e5e7eb",borderRadius:12,fontSize:13,color:"#444",cursor:"pointer",lineHeight:1.5,transition:"all 0.15s"}}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor="#dc0000"; (e.currentTarget as HTMLButtonElement).style.color="#dc0000" }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor="#e5e7eb"; (e.currentTarget as HTMLButtonElement).style.color="#444" }}
          >
            {s}
          </button>
        ))}
      </div>

      <div style={{marginTop:32,display:"flex",gap:6}}>
        <div style={{width:40,height:4,borderRadius:2,background:"#dc0000"}} />
        <div style={{width:40,height:4,borderRadius:2,background:"#1a1a1a"}} />
        <div style={{width:40,height:4,borderRadius:2,background:"#ffc700"}} />
      </div>
    </div>
  )
}
