import Link from "next/link"
import { ArrowRight, Mail, Github, Linkedin, Instagram, Brain, Calculator, Code2, FileText, BookOpen, Search } from "lucide-react"

export default function HomePage() {
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
            <Link href="/auth/login" style={{color:"#dc0000",textDecoration:"none",padding:"6px 14px",borderRadius:8,fontSize:14,fontWeight:700}}>Sign in</Link>
            <Link href="/auth/signup" style={{background:"#dc0000",color:"white",textDecoration:"none",padding:"8px 18px",borderRadius:10,fontSize:14,fontWeight:700}}>Get Started</Link>
          </div>
        </div>
      </nav>

      {/* FLAG STRIP */}
      <div style={{display:"flex",height:6}}>
        <div style={{flex:1,background:"#dc0000"}} />
        <div style={{flex:1,background:"#1a1a1a"}} />
        <div style={{flex:1,background:"#ffc700"}} />
      </div>

      {/* HERO */}
      <section id="home" style={{background:"linear-gradient(135deg,#fff5f5 0%,#fff8e1 50%,#fff 100%)",padding:"100px 2rem 80px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:40,right:"10%",width:200,height:200,background:"rgba(220,0,0,0.06)",borderRadius:24,transform:"rotate(12deg)"}} />
        <div style={{position:"absolute",top:80,right:"5%",width:120,height:120,background:"rgba(255,199,0,0.08)",borderRadius:20,transform:"rotate(8deg)"}} />
        <div style={{position:"absolute",bottom:60,left:"8%",width:160,height:160,background:"rgba(220,0,0,0.04)",borderRadius:"50%"}} />

        <div style={{maxWidth:800,margin:"0 auto",position:"relative",zIndex:1}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(220,0,0,0.08)",color:"#dc0000",padding:"6px 16px",borderRadius:999,fontSize:13,fontWeight:600,marginBottom:24}}>
            ✨ Built for Learners & Educators
          </div>
          <h1 style={{fontSize:"clamp(2.5rem,6vw,4.5rem)",fontWeight:900,lineHeight:1.1,marginBottom:16,color:"#1a1a1a"}}>
            EduAI
          </h1>
          <h2 style={{fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"#dc0000",marginBottom:24}}>
            Smart Learning Assistant
          </h2>
          <p style={{fontSize:"1.15rem",color:"#555",maxWidth:560,margin:"0 auto 16px",lineHeight:1.7}}>
            Complete AI solutions for <strong style={{color:"#dc0000"}}>students</strong>, <strong style={{color:"#1a1a1a"}}>educators</strong>, and <strong style={{color:"#b8860b"}}>researchers</strong>.
          </p>
          <p style={{fontSize:"1rem",color:"#777",marginBottom:40}}>
            Our mission: <strong style={{color:"#dc0000"}}>Make quality education accessible for all 🇹🇱</strong>
          </p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/auth/signup" style={{display:"inline-flex",alignItems:"center",gap:8,background:"#dc0000",color:"white",textDecoration:"none",padding:"14px 32px",borderRadius:14,fontSize:16,fontWeight:700}}>
              Get Started Free <ArrowRight size={18} />
            </Link>
            <Link href="/auth/login" style={{display:"inline-flex",alignItems:"center",gap:8,background:"white",color:"#dc0000",textDecoration:"none",padding:"14px 32px",borderRadius:14,fontSize:16,fontWeight:700,border:"2px solid #dc0000"}}>
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section id="about" style={{padding:"80px 2rem",textAlign:"center",background:"#fff"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <h2 style={{fontSize:"2.2rem",fontWeight:800,marginBottom:8,color:"#1a1a1a"}}>What We Do</h2>
          <p style={{color:"#777",marginBottom:56,fontSize:"1.05rem"}}>Our mission is to advance AI education through three core capabilities</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:32}}>
            {[
              {icon:"🎓",color:"#dc0000",title:"We Teach",desc:"Personalized AI tutoring for students at every level — from K-12 to university and beyond."},
              {icon:"🔬",color:"#1a1a1a",title:"We Research",desc:"Cutting-edge tools for research support, paper summarization, and concept explanation."},
              {icon:"🛠️",color:"#b8860b",title:"We Build",desc:"Practical AI tools for educators — lesson plans, quizzes, worksheets, and teaching materials."},
            ].map(({icon,color,title,desc}) => (
              <div key={title} style={{textAlign:"center",padding:"2rem 1.5rem"}}>
                <div style={{width:72,height:72,background:`${color}15`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",fontSize:32}}>{icon}</div>
                <h3 style={{fontWeight:700,fontSize:"1.2rem",marginBottom:10,color}}>{title}</h3>
                <p style={{color:"#666",lineHeight:1.7,fontSize:"0.95rem"}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{padding:"80px 2rem",background:"#fffdf0"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <h2 style={{fontSize:"2.2rem",fontWeight:800,textAlign:"center",marginBottom:8,color:"#1a1a1a"}}>6 Powerful Learning Modes</h2>
          <p style={{color:"#777",textAlign:"center",marginBottom:48,fontSize:"1.05rem"}}>Everything you need to learn, teach, and grow</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20}}>
            {[
              {icon:<Brain size={22}/>,color:"#dc0000",bg:"#dc000015",label:"Study Support",desc:"Personalized AI tutoring for any subject. Adaptive explanations that match your level."},
              {icon:<Calculator size={22}/>,color:"#1a1a1a",bg:"#1a1a1a15",label:"Math Tutor",desc:"Step-by-step solutions with full reasoning. Never skip a step — understand the why."},
              {icon:<Code2 size={22}/>,color:"#b8860b",bg:"#ffc70020",label:"Coding Help",desc:"Debug errors, learn concepts, and write better code with AI guidance."},
              {icon:<FileText size={22}/>,color:"#dc0000",bg:"#dc000015",label:"Quiz Generator",desc:"Auto-generate MCQs, worksheets, and assessments for any topic in seconds."},
              {icon:<BookOpen size={22}/>,color:"#1a1a1a",bg:"#1a1a1a15",label:"Lesson Planner",desc:"Build complete lesson plans with objectives, activities, and assessments instantly."},
              {icon:<Search size={22}/>,color:"#b8860b",bg:"#ffc70020",label:"Research Help",desc:"Summarize papers, explain concepts, and get help navigating complex research."},
            ].map(({icon,color,bg,label,desc}) => (
              <div key={label} style={{background:"white",borderRadius:20,padding:"1.5rem",border:"1px solid #f0f0f0",borderTop:`3px solid ${color}`,display:"flex",flexDirection:"column",gap:12}}>
                <div style={{width:44,height:44,background:bg,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",color}}>{icon}</div>
                <h3 style={{fontWeight:700,fontSize:"1rem",margin:0,color}}>{label}</h3>
                <p style={{color:"#666",fontSize:"0.9rem",lineHeight:1.6,margin:0}}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:40}}>
            <Link href="/auth/signup" style={{display:"inline-flex",alignItems:"center",gap:8,background:"#dc0000",color:"white",textDecoration:"none",padding:"14px 36px",borderRadius:14,fontSize:16,fontWeight:700}}>
              Start Learning Free <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOR WHO */}
      <section style={{padding:"80px 2rem",background:"#fff"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <h2 style={{fontSize:"2.2rem",fontWeight:800,textAlign:"center",marginBottom:8}}>Built For Everyone</h2>
          <p style={{color:"#777",textAlign:"center",marginBottom:48,fontSize:"1.05rem"}}>Whether you learn or teach — EduAI is your companion</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
            {[
              {icon:"🎒",color:"#dc0000",title:"For Students",items:["AI tutoring 24/7","Math step-by-step","Coding guidance","Research support"]},
              {icon:"👨‍🏫",color:"#1a1a1a",title:"For Teachers",items:["Lesson planning","Quiz generation","Teaching materials","Class management"]},
              {icon:"🏫",color:"#b8860b",title:"For Schools",items:["Curriculum support","Student progress","Teacher tools","AI-powered learning"]},
              {icon:"🎓",color:"#dc0000",title:"For Universities",items:["Research assistance","Advanced subjects","Paper summarization","Academic support"]},
            ].map(({icon,color,title,items}) => (
              <div key={title} style={{background:"white",borderRadius:20,padding:"1.5rem",border:"1px solid #f0f0f0",borderTop:`3px solid ${color}`}}>
                <div style={{width:52,height:52,background:`${color}15`,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:14}}>{icon}</div>
                <h3 style={{fontWeight:700,marginBottom:12,color}}>{title}</h3>
                {items.map(item => (
                  <a key={item} href="/auth/signup" style={{display:"block",color,fontSize:"0.875rem",textDecoration:"none",marginBottom:6,fontWeight:500}}>{item} →</a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" style={{padding:"80px 2rem",background:"#fffdf0",textAlign:"center"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <h2 style={{fontSize:"2.2rem",fontWeight:800,marginBottom:8,color:"#dc0000"}}>Team EduAI</h2>
          <p style={{color:"#777",marginBottom:48,fontSize:"1.05rem"}}>Built by an AI researcher from Timor-Leste 🇹🇱</p>
          <div style={{background:"white",borderRadius:28,padding:"2.5rem",border:"2px solid #ffc700",maxWidth:480,margin:"0 auto",boxShadow:"0 8px 40px rgba(220,0,0,0.1)"}}>
            <img src="https://i.postimg.cc/DwFCp429/profile-jpg.jpg" alt="Osorio Soarez"
              style={{width:140,height:140,borderRadius:"50%",objectFit:"cover",border:"4px solid #dc0000",marginBottom:20}} />
            <h3 style={{fontWeight:800,fontSize:"1.4rem",marginBottom:4,color:"#1a1a1a"}}>Osorio Soarez</h3>
            <p style={{color:"#dc0000",fontWeight:700,marginBottom:8,fontSize:"0.95rem"}}>Founder & AI Researcher</p>
            <p style={{color:"#888",fontSize:"0.875rem",marginBottom:4}}>🎓 Master's Student — USTC, China</p>
            <p style={{color:"#888",fontSize:"0.875rem",marginBottom:16}}>🇹🇱 From Dili, Timor-Leste</p>
            <p style={{color:"#555",fontSize:"0.9rem",lineHeight:1.7,marginBottom:20}}>
              AI researcher specializing in LLM inference optimization, distributed AI systems, and cloud-based AI deployment. Passionate about making quality education accessible for everyone.
            </p>
            <div style={{display:"flex",gap:12,justifyContent:"center"}}>
              {[
                {icon:<Mail size={16}/>,href:"mailto:suarezoso27@gmail.com",color:"#dc0000"},
                {icon:<Linkedin size={16}/>,href:"https://www.linkedin.com/in/osorio-soarez",color:"#1a1a1a"},
                {icon:<Github size={16}/>,href:"https://github.com/SoarezTL",color:"#1a1a1a"},
                {icon:<Instagram size={16}/>,href:"https://www.instagram.com/soarez_osorio",color:"#b8860b"},
              ].map(({icon,href,color},i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  style={{width:38,height:38,background:`${color}15`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color,textDecoration:"none"}}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{padding:"80px 2rem",background:"#fff",textAlign:"center"}}>
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <h2 style={{fontSize:"2.2rem",fontWeight:800,marginBottom:8}}>Get In Touch</h2>
          <p style={{color:"#777",marginBottom:40,fontSize:"1.05rem"}}>Feel free to reach out for collaboration, research, or opportunities</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:32}}>
            {[
              {icon:"✉️",label:"Email",value:"suarezoso27@gmail.com",href:"mailto:suarezoso27@gmail.com",color:"#dc0000"},
              {icon:"💼",label:"LinkedIn",value:"osorio-soarez",href:"https://www.linkedin.com/in/osorio-soarez",color:"#1a1a1a"},
              {icon:"💻",label:"GitHub",value:"SoarezTL",href:"https://github.com/SoarezTL",color:"#1a1a1a"},
              {icon:"🎓",label:"University",value:"USTC, Hefei, China",href:"https://en.ustc.edu.cn",color:"#b8860b"},
            ].map(({icon,label,value,href,color}) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{background:"#fff8e1",borderRadius:16,padding:"1.25rem",textDecoration:"none",color:"inherit",border:`1px solid #ffc700`,display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
                <span style={{fontSize:24}}>{icon}</span>
                <span style={{fontWeight:600,fontSize:"0.875rem",color:"#888"}}>{label}</span>
                <span style={{fontWeight:700,fontSize:"0.875rem",color}}>{value}</span>
              </a>
            ))}
          </div>
          <Link href="/auth/signup" style={{display:"inline-flex",alignItems:"center",gap:8,background:"#dc0000",color:"white",textDecoration:"none",padding:"14px 36px",borderRadius:14,fontSize:16,fontWeight:700}}>
            Start Using EduAI Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:"#1a1a1a",color:"white",padding:"40px 2rem"}}>
        <div style={{display:"flex",height:6,marginBottom:32}}>
          <div style={{flex:1,background:"#dc0000"}} />
          <div style={{flex:1,background:"#1a1a1a",border:"1px solid #333"}} />
          <div style={{flex:1,background:"#ffc700"}} />
        </div>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",flexWrap:"wrap",gap:32,justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <span style={{fontSize:24}}>🎓</span>
              <span style={{fontWeight:900,fontSize:20,color:"#dc0000"}}>EduAI</span>
              <span style={{fontSize:12}}>🇹🇱</span>
            </div>
            <p style={{color:"#aaa",fontSize:"0.875rem",maxWidth:260}}>Making quality education accessible for all — built with ❤️ by Osorio Soarez from Timor-Leste 🇹🇱</p>
          </div>
          <div style={{display:"flex",gap:32,flexWrap:"wrap"}}>
            {[
              {title:"Platform",links:["Study","Math","Code","Quiz","Lesson","Research"]},
              {title:"Company",links:["About","Team","Contact","GitHub"]},
            ].map(({title,links}) => (
              <div key={title}>
                <p style={{fontWeight:700,marginBottom:12,fontSize:"0.875rem",color:"#ffc700"}}>{title}</p>
                {links.map(link => (
                  <a key={link} href="#" style={{display:"block",color:"#aaa",fontSize:"0.875rem",textDecoration:"none",marginBottom:6}}>{link}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{maxWidth:1100,margin:"24px auto 0",borderTop:"1px solid #333",paddingTop:20,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <p style={{color:"#666",fontSize:"0.8rem"}}>© {new Date().getFullYear()} EduAI by Osorio Soarez. All rights reserved.</p>
          <p style={{color:"#666",fontSize:"0.8rem"}}>Built with Next.js + AI · Dili, Timor-Leste 🇹🇱</p>
        </div>
      </footer>

    </main>
  )
}