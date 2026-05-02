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

const T = {
  en: {
    nav: ["Home","About","Features","Team","Contact"],
    signin: "Sign in", getstarted: "Get Started",
    badge: "✨ Built for Learners & Educators",
    hero1: "EduAI", hero2: "Smart Learning Assistant",
    hero3: "Complete AI solutions for", hero4: "students", hero5: "educators", hero6: "researchers",
    hero7: "Our mission:", hero8: "Make quality education accessible for all 🇹🇱",
    cta1: "Get Started Free", cta2: "Sign In",
    whatwe: "What We Do", whatwesub: "Our mission is to advance AI education through three core capabilities",
    teach: "We Teach", teachdesc: "Personalized AI tutoring for students at every level — from K-12 to university and beyond.",
    research: "We Research", researchdesc: "Cutting-edge tools for research support, paper summarization, and concept explanation.",
    build: "We Build", builddesc: "Practical AI tools for educators — lesson plans, quizzes, worksheets, and teaching materials.",
    feat: "6 Powerful Learning Modes", featsub: "Everything you need to learn, teach, and grow",
    everyone: "Built For Everyone", everyonesub: "Whether you learn or teach — EduAI is your companion",
    startfree: "Start Learning Free",
    team: "Team EduAI", teamsub: "Built by an AI researcher from Timor-Leste 🇹🇱",
    role: "Founder & AI Researcher", masters: "Master's Student — USTC, China", from: "From Dili, Timor-Leste",
    bio: "AI researcher specializing in LLM inference optimization, distributed AI systems, and cloud-based AI deployment. Passionate about making quality education accessible for everyone.",
    contact: "Get In Touch", contactsub: "Feel free to reach out for collaboration, research, or opportunities",
    startusing: "Start Using EduAI Free",
    footer: "Making quality education accessible for all — built with ❤️ by Osorio Soarez from Timor-Leste 🇹🇱",
    platform: "Platform", company: "Company",
    copyright: "EduAI by Osorio Soarez. All rights reserved.",
    features: [
      {label:"Study Support",desc:"Personalized AI tutoring for any subject. Adaptive explanations that match your level."},
      {label:"Math Tutor",desc:"Step-by-step solutions with full reasoning. Never skip a step — understand the why."},
      {label:"Coding Help",desc:"Debug errors, learn concepts, and write better code with AI guidance."},
      {label:"Quiz Generator",desc:"Auto-generate MCQs, worksheets, and assessments for any topic in seconds."},
      {label:"Lesson Planner",desc:"Build complete lesson plans with objectives, activities, and assessments instantly."},
      {label:"Research Help",desc:"Summarize papers, explain concepts, and get help navigating complex research."},
    ],
    forWho: [
      {icon:"🎒",title:"For Students",items:["AI tutoring 24/7","Math step-by-step","Coding guidance","Research support"]},
      {icon:"👨‍🏫",title:"For Teachers",items:["Lesson planning","Quiz generation","Teaching materials","Class management"]},
      {icon:"🏫",title:"For Schools",items:["Curriculum support","Student progress","Teacher tools","AI-powered learning"]},
      {icon:"🎓",title:"For Universities",items:["Research assistance","Advanced subjects","Paper summarization","Academic support"]},
    ],
  },
  tet: {
    nav: ["Hasoru","Kona-ba","Karakterístika","Ekipa","Kontaktu"],
    signin: "Tama", getstarted: "Hahu Agora",
    badge: "✨ Harii ba Estudante no Edukasor",
    hero1: "EduAI", hero2: "Asistentu Aprendizajen Intelizente",
    hero3: "Solusaun AI kompletu ba", hero4: "estudante", hero5: "edukasor", hero6: "peskizador",
    hero7: "Misaun ami nian:", hero8: "Halo edukasaun kualidade asesu ba ema hotu 🇹🇱",
    cta1: "Hahu Grátis", cta2: "Tama",
    whatwe: "Saida mak Ami Halo", whatwesub: "Misaun ami nian mak avansa edukasaun AI liu husi kapasidade tolu",
    teach: "Ami Hanorin", teachdesc: "Tutoria AI personalizadu ba estudante iha nivel hotu — husi K-12 to universidade.",
    research: "Ami Peskiza", researchdesc: "Instrumentu avansadu ba apoiu peskiza, rezumu artigu, no esplikasaun konseitu.",
    build: "Ami Kria", builddesc: "Instrumentu AI prátiku ba edukasor — planu lisaun, quiz, folia trabalhu, no matérial hanorin.",
    feat: "Modu Aprendizajen 6 Poderoza", featsub: "Hotu mak ita presiza atu aprende, hanorin, no kresimentu",
    everyone: "Harii Ba Ema Hotu", everyonesub: "Sé aprende ka hanorin — EduAI mak ita-nia akompaña",
    startfree: "Hahu Aprende Grátis",
    team: "Ekipa EduAI", teamsub: "Harii husi peskizador AI husi Timor-Leste 🇹🇱",
    role: "Fundasaun & Peskizador AI", masters: "Estudante Mestrado — USTC, Xina", from: "Husi Dili, Timor-Leste",
    bio: "Peskizador AI espesializa iha otimizasaun inferénsia LLM, sistema AI distribuidu, no implementasaun AI bazeia ba núvem. Paixaun atu halo edukasaun kualidade asesu ba ema hotu.",
    contact: "Kontaktu Ami", contactsub: "Bele kontaktu ami ba kolaborasaun, peskiza, ka oportunidade",
    startusing: "Hahu Uza EduAI Grátis",
    footer: "Halo edukasaun kualidade asesu ba ema hotu — harii ho ❤️ husi Osorio Soarez husi Timor-Leste 🇹🇱",
    platform: "Plataforma", company: "Kompañia",
    copyright: "EduAI husi Osorio Soarez. Direitu hotu rezervadu.",
    features: [
      {label:"Apoiu Estudu",desc:"Tutoria AI personalizadu ba matéria hotu. Esplikasaun adaptativu ne'ebé akompaña nivel ita."},
      {label:"Tutor Matematika",desc:"Solusaun pasu-pasu ho razaun kompletu. La sai pasu ida — komprende razaun."},
      {label:"Ajuda Kódigu",desc:"Debug erru, aprende konseitu, no hakerek kódigu di'ak liu ho orientasaun AI."},
      {label:"Gerador Quiz",desc:"Kria automatikamente MCQ, folia trabalhu, no avaliasaun ba topiku hotu iha segundu."},
      {label:"Planeador Lisaun",desc:"Kria planu lisaun kompletu ho objetivu, atividade, no avaliasaun imediatamente."},
      {label:"Ajuda Peskiza",desc:"Rezumu artigu, esplikasaun konseitu, no ajuda navega peskiza kompleksu."},
    ],
    forWho: [
      {icon:"🎒",title:"Ba Estudante",items:["Tutoria AI 24/7","Matematika pasu-pasu","Orientasaun kódigu","Apoiu peskiza"]},
      {icon:"👨‍🏫",title:"Ba Profesor",items:["Planeamentu lisaun","Jerasaun quiz","Matérial hanorin","Jestaun klase"]},
      {icon:"🏫",title:"Ba Eskola",items:["Apoiu kurríkulu","Progresu estudante","Instrumentu profesor","Aprendizajen AI"]},
      {icon:"🎓",title:"Ba Universidade",items:["Asisténsia peskiza","Matéria avansadu","Rezumu artigu","Apoiu akadémiku"]},
    ],
  },
  pt: {
    nav: ["Início","Sobre","Recursos","Equipa","Contato"],
    signin: "Entrar", getstarted: "Começar",
    badge: "✨ Construído para Estudantes e Educadores",
    hero1: "EduAI", hero2: "Assistente de Aprendizagem Inteligente",
    hero3: "Soluções completas de IA para", hero4: "estudantes", hero5: "educadores", hero6: "pesquisadores",
    hero7: "Nossa missão:", hero8: "Tornar a educação de qualidade acessível a todos 🇹🇱",
    cta1: "Começar Grátis", cta2: "Entrar",
    whatwe: "O Que Fazemos", whatwesub: "Nossa missão é avançar a educação em IA através de três capacidades principais",
    teach: "Ensinamos", teachdesc: "Tutoria de IA personalizada para estudantes em todos os níveis — do ensino básico à universidade.",
    research: "Pesquisamos", researchdesc: "Ferramentas de ponta para suporte à pesquisa, resumo de artigos e explicação de conceitos.",
    build: "Construímos", builddesc: "Ferramentas práticas de IA para educadores — planos de aula, questionários e materiais didáticos.",
    feat: "6 Modos de Aprendizagem Poderosos", featsub: "Tudo o que você precisa para aprender, ensinar e crescer",
    everyone: "Construído Para Todos", everyonesub: "Seja para aprender ou ensinar — EduAI é o seu companheiro",
    startfree: "Começar a Aprender Grátis",
    team: "Equipa EduAI", teamsub: "Construído por um pesquisador de IA de Timor-Leste 🇹🇱",
    role: "Fundador & Pesquisador de IA", masters: "Estudante de Mestrado — USTC, China", from: "De Dili, Timor-Leste",
    bio: "Pesquisador de IA especializado em otimização de inferência LLM, sistemas de IA distribuídos e implementação de IA baseada em nuvem. Apaixonado por tornar a educação de qualidade acessível a todos.",
    contact: "Entre em Contato", contactsub: "Sinta-se à vontade para entrar em contato para colaboração, pesquisa ou oportunidades",
    startusing: "Começar a Usar EduAI Grátis",
    footer: "Tornando a educação de qualidade acessível a todos — construído com ❤️ por Osorio Soarez de Timor-Leste 🇹🇱",
    platform: "Plataforma", company: "Empresa",
    copyright: "EduAI por Osorio Soarez. Todos os direitos reservados.",
    features: [
      {label:"Suporte ao Estudo",desc:"Tutoria de IA personalizada para qualquer matéria. Explicações adaptativas que correspondem ao seu nível."},
      {label:"Tutor de Matemática",desc:"Soluções passo a passo com raciocínio completo. Nunca pule uma etapa — entenda o porquê."},
      {label:"Ajuda com Código",desc:"Depure erros, aprenda conceitos e escreva código melhor com orientação de IA."},
      {label:"Gerador de Quiz",desc:"Gere automaticamente MCQs, folhas de trabalho e avaliações para qualquer tópico em segundos."},
      {label:"Planejador de Aulas",desc:"Crie planos de aula completos com objetivos, atividades e avaliações instantaneamente."},
      {label:"Ajuda com Pesquisa",desc:"Resuma artigos, explique conceitos e navegue em pesquisas complexas."},
    ],
    forWho: [
      {icon:"🎒",title:"Para Estudantes",items:["Tutoria IA 24/7","Matemática passo a passo","Orientação em código","Suporte à pesquisa"]},
      {icon:"👨‍🏫",title:"Para Professores",items:["Planejamento de aulas","Geração de quiz","Materiais didáticos","Gestão de turma"]},
      {icon:"🏫",title:"Para Escolas",items:["Suporte curricular","Progresso estudantil","Ferramentas para professores","Aprendizagem com IA"]},
      {icon:"🎓",title:"Para Universidades",items:["Assistência à pesquisa","Matérias avançadas","Resumo de artigos","Suporte acadêmico"]},
    ],
  },
  id: {
    nav: ["Beranda","Tentang","Fitur","Tim","Kontak"],
    signin: "Masuk", getstarted: "Mulai",
    badge: "✨ Dibangun untuk Pelajar & Pendidik",
    hero1: "EduAI", hero2: "Asisten Pembelajaran Cerdas",
    hero3: "Solusi AI lengkap untuk", hero4: "pelajar", hero5: "pendidik", hero6: "peneliti",
    hero7: "Misi kami:", hero8: "Membuat pendidikan berkualitas dapat diakses semua orang 🇹🇱",
    cta1: "Mulai Gratis", cta2: "Masuk",
    whatwe: "Apa yang Kami Lakukan", whatwesub: "Misi kami adalah memajukan pendidikan AI melalui tiga kemampuan inti",
    teach: "Kami Mengajar", teachdesc: "Tutoring AI personal untuk siswa di semua tingkatan — dari K-12 hingga universitas.",
    research: "Kami Meneliti", researchdesc: "Alat canggih untuk dukungan penelitian, ringkasan makalah, dan penjelasan konsep.",
    build: "Kami Membangun", builddesc: "Alat AI praktis untuk pendidik — rencana pelajaran, kuis, lembar kerja, dan materi pengajaran.",
    feat: "6 Mode Pembelajaran Powerful", featsub: "Semua yang Anda butuhkan untuk belajar, mengajar, dan berkembang",
    everyone: "Dibangun Untuk Semua", everyonesub: "Baik belajar maupun mengajar — EduAI adalah teman Anda",
    startfree: "Mulai Belajar Gratis",
    team: "Tim EduAI", teamsub: "Dibangun oleh peneliti AI dari Timor-Leste 🇹🇱",
    role: "Pendiri & Peneliti AI", masters: "Mahasiswa S2 — USTC, China", from: "Dari Dili, Timor-Leste",
    bio: "Peneliti AI yang mengkhususkan diri dalam optimasi inferensi LLM, sistem AI terdistribusi, dan penerapan AI berbasis cloud. Bersemangat untuk membuat pendidikan berkualitas dapat diakses semua orang.",
    contact: "Hubungi Kami", contactsub: "Jangan ragu untuk menghubungi kami untuk kolaborasi, penelitian, atau peluang",
    startusing: "Mulai Menggunakan EduAI Gratis",
    footer: "Membuat pendidikan berkualitas dapat diakses semua orang — dibangun dengan ❤️ oleh Osorio Soarez dari Timor-Leste 🇹🇱",
    platform: "Platform", company: "Perusahaan",
    copyright: "EduAI oleh Osorio Soarez. Semua hak dilindungi.",
    features: [
      {label:"Dukungan Belajar",desc:"Tutoring AI personal untuk mata pelajaran apa pun. Penjelasan adaptif yang sesuai dengan level Anda."},
      {label:"Tutor Matematika",desc:"Solusi langkah demi langkah dengan penalaran lengkap. Jangan lewati langkah — pahami alasannya."},
      {label:"Bantuan Koding",desc:"Debug kesalahan, pelajari konsep, dan tulis kode yang lebih baik dengan panduan AI."},
      {label:"Generator Kuis",desc:"Buat MCQ, lembar kerja, dan penilaian secara otomatis untuk topik apa pun dalam hitungan detik."},
      {label:"Perencana Pelajaran",desc:"Buat rencana pelajaran lengkap dengan tujuan, aktivitas, dan penilaian secara instan."},
      {label:"Bantuan Penelitian",desc:"Ringkas makalah, jelaskan konsep, dan bantu navigasi penelitian kompleks."},
    ],
    forWho: [
      {icon:"🎒",title:"Untuk Pelajar",items:["Tutoring AI 24/7","Matematika langkah demi langkah","Panduan koding","Dukungan penelitian"]},
      {icon:"👨‍🏫",title:"Untuk Guru",items:["Perencanaan pelajaran","Pembuatan kuis","Materi pengajaran","Manajemen kelas"]},
      {icon:"🏫",title:"Untuk Sekolah",items:["Dukungan kurikulum","Kemajuan siswa","Alat guru","Pembelajaran AI"]},
      {icon:"🎓",title:"Untuk Universitas",items:["Bantuan penelitian","Mata kuliah lanjutan","Ringkasan makalah","Dukungan akademik"]},
    ],
  },
  zh: {
    nav: ["首页","关于","功能","团队","联系"],
    signin: "登录", getstarted: "开始使用",
    badge: "✨ 专为学习者和教育者打造",
    hero1: "EduAI", hero2: "智能学习助手",
    hero3: "为以下人群提供完整的AI解决方案", hero4: "学生", hero5: "教育者", hero6: "研究人员",
    hero7: "我们的使命:", hero8: "让所有人都能获得优质教育 🇹🇱",
    cta1: "免费开始", cta2: "登录",
    whatwe: "我们做什么", whatwesub: "我们的使命是通过三项核心能力推进AI教育",
    teach: "我们教学", teachdesc: "为各年级学生提供个性化AI辅导——从K-12到大学。",
    research: "我们研究", researchdesc: "用于研究支持、论文摘要和概念解释的尖端工具。",
    build: "我们构建", builddesc: "为教育者提供实用AI工具——课程计划、测验、工作表和教学材料。",
    feat: "6种强大的学习模式", featsub: "学习、教学和成长所需的一切",
    everyone: "为所有人打造", everyonesub: "无论学习还是教学——EduAI是您的伙伴",
    startfree: "免费开始学习",
    team: "EduAI团队", teamsub: "由来自东帝汶的AI研究员构建 🇹🇱",
    role: "创始人&AI研究员", masters: "硕士研究生——中国科大", from: "来自东帝汶帝力",
    bio: "专注于LLM推理优化、分布式AI系统和基于云的AI部署的AI研究员。热衷于让所有人都能获得优质教育。",
    contact: "联系我们", contactsub: "欢迎联系我们进行合作、研究或寻求机会",
    startusing: "免费开始使用EduAI",
    footer: "让所有人都能获得优质教育——由来自东帝汶的Osorio Soarez用❤️构建 🇹🇱",
    platform: "平台", company: "公司",
    copyright: "EduAI由Osorio Soarez创建。保留所有权利。",
    features: [
      {label:"学习支持",desc:"为任何科目提供个性化AI辅导。适应您水平的自适应解释。"},
      {label:"数学辅导",desc:"逐步解答，完整推理。不跳过任何步骤——理解原因。"},
      {label:"编程帮助",desc:"调试错误，学习概念，在AI指导下编写更好的代码。"},
      {label:"测验生成器",desc:"在几秒内自动生成任何主题的MCQ、工作表和评估。"},
      {label:"课程规划",desc:"立即构建包含目标、活动和评估的完整课程计划。"},
      {label:"研究帮助",desc:"总结论文，解释概念，帮助导航复杂研究。"},
    ],
    forWho: [
      {icon:"🎒",title:"面向学生",items:["24/7 AI辅导","数学逐步解答","编程指导","研究支持"]},
      {icon:"👨‍🏫",title:"面向教师",items:["课程规划","测验生成","教学材料","班级管理"]},
      {icon:"🏫",title:"面向学校",items:["课程支持","学生进度","教师工具","AI驱动学习"]},
      {icon:"🎓",title:"面向大学",items:["研究协助","高级科目","论文摘要","学术支持"]},
    ],
  },
  de: {
    nav: ["Start","Über uns","Funktionen","Team","Kontakt"],
    signin: "Anmelden", getstarted: "Loslegen",
    badge: "✨ Für Lernende und Lehrende entwickelt",
    hero1: "EduAI", hero2: "Intelligenter Lernassistent",
    hero3: "Komplette KI-Lösungen für", hero4: "Schüler", hero5: "Lehrkräfte", hero6: "Forscher",
    hero7: "Unsere Mission:", hero8: "Hochwertige Bildung für alle zugänglich machen 🇹🇱",
    cta1: "Kostenlos starten", cta2: "Anmelden",
    whatwe: "Was wir tun", whatwesub: "Unsere Mission ist es, KI-Bildung durch drei Kernfähigkeiten voranzutreiben",
    teach: "Wir lehren", teachdesc: "Personalisiertes KI-Tutoring für Schüler auf allen Ebenen — von K-12 bis zur Universität.",
    research: "Wir forschen", researchdesc: "Modernste Werkzeuge für Forschungsunterstützung, Paper-Zusammenfassungen und Konzepterklärungen.",
    build: "Wir bauen", builddesc: "Praktische KI-Tools für Lehrkräfte — Unterrichtspläne, Quiz, Arbeitsblätter und Lehrmaterialien.",
    feat: "6 leistungsstarke Lernmodi", featsub: "Alles was Sie zum Lernen, Lehren und Wachsen brauchen",
    everyone: "Für alle entwickelt", everyonesub: "Ob Lernen oder Lehren — EduAI ist Ihr Begleiter",
    startfree: "Kostenlos lernen",
    team: "Team EduAI", teamsub: "Entwickelt von einem KI-Forscher aus Timor-Leste 🇹🇱",
    role: "Gründer & KI-Forscher", masters: "Masterstudent — USTC, China", from: "Aus Dili, Timor-Leste",
    bio: "KI-Forscher spezialisiert auf LLM-Inferenzoptimierung, verteilte KI-Systeme und Cloud-basierte KI-Bereitstellung. Leidenschaftlich daran interessiert, hochwertige Bildung für alle zugänglich zu machen.",
    contact: "Kontakt aufnehmen", contactsub: "Kontaktieren Sie uns gerne für Zusammenarbeit, Forschung oder Möglichkeiten",
    startusing: "EduAI kostenlos nutzen",
    footer: "Hochwertige Bildung für alle zugänglich machen — mit ❤️ von Osorio Soarez aus Timor-Leste entwickelt 🇹🇱",
    platform: "Plattform", company: "Unternehmen",
    copyright: "EduAI von Osorio Soarez. Alle Rechte vorbehalten.",
    features: [
      {label:"Lernunterstützung",desc:"Personalisiertes KI-Tutoring für jedes Fach. Adaptive Erklärungen, die Ihrem Niveau entsprechen."},
      {label:"Mathe-Tutor",desc:"Schritt-für-Schritt-Lösungen mit vollständiger Begründung. Nie einen Schritt überspringen — das Warum verstehen."},
      {label:"Programmier-Hilfe",desc:"Fehler debuggen, Konzepte lernen und mit KI-Anleitung besseren Code schreiben."},
      {label:"Quiz-Generator",desc:"MCQs, Arbeitsblätter und Bewertungen für jedes Thema in Sekunden automatisch erstellen."},
      {label:"Unterrichtsplaner",desc:"Vollständige Unterrichtspläne mit Zielen, Aktivitäten und Bewertungen sofort erstellen."},
      {label:"Forschungshilfe",desc:"Paper zusammenfassen, Konzepte erklären und bei der Navigation komplexer Forschung helfen."},
    ],
    forWho: [
      {icon:"🎒",title:"Für Schüler",items:["KI-Tutoring 24/7","Mathe Schritt für Schritt","Programmier-Anleitung","Forschungsunterstützung"]},
      {icon:"👨‍🏫",title:"Für Lehrer",items:["Unterrichtsplanung","Quiz-Erstellung","Lehrmaterialien","Klassenverwaltung"]},
      {icon:"🏫",title:"Für Schulen",items:["Lehrplanunterstützung","Schülerfortschritt","Lehrer-Tools","KI-gesteuertes Lernen"]},
      {icon:"🎓",title:"Für Universitäten",items:["Forschungsassistenz","Fortgeschrittene Fächer","Paper-Zusammenfassung","Akademische Unterstützung"]},
    ],
  },
}

type LangKey = keyof typeof T

export default function HomePage() {
  const [showLangs, setShowLangs] = useState(false)
  const [lang, setLang] = useState<LangKey>("en")

  const handleLanguageChange = (id: string) => {
    setLang(id as LangKey)
    setShowLangs(false)
    if (typeof window !== "undefined") {
      localStorage.setItem("eduai-lang", id)
    }
  }

  const t = T[lang]
  const selectedLang = LANGUAGES.find(l => l.id === lang) ?? LANGUAGES[0]
  const colors = ["#dc0000","#1a1a1a","#b8860b","#dc0000","#1a1a1a","#b8860b"]
  const bgs = ["#dc000015","#1a1a1a15","#ffc70020","#dc000015","#1a1a1a15","#ffc70020"]
  const icons = [<Brain size={22}/>,<Calculator size={22}/>,<Code2 size={22}/>,<FileText size={22}/>,<BookOpen size={22}/>,<Search size={22}/>]
  const forWhoColors = ["#dc0000","#1a1a1a","#b8860b","#dc0000"]

  return (
    <main style={{fontFamily:"system-ui,sans-serif",background:"#fff",color:"#1a1a1a"}}>

      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:50,background:"rgba(255,255,255,0.95)",backdropFilter:"blur(12px)",borderBottom:"3px solid #dc0000",padding:"0 2rem"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,background:"linear-gradient(135deg,#dc0000,#ffc700)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🎓</div>
            <span style={{fontWeight:900,fontSize:20,color:"#dc0000"}}>EduAI</span>
            <span style={{fontSize:10,background:"#ffc700",color:"#1a1a1a",padding:"2px 6px",borderRadius:4,fontWeight:700}}>🇹🇱 TL</span>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {t.nav.map((item, i) => (
              <a key={i} href={`#${["home","about","features","team","contact"][i]}`} style={{color:"#444",textDecoration:"none",padding:"6px 12px",borderRadius:8,fontSize:14,fontWeight:500}}>{item}</a>
            ))}
            <div style={{position:"relative"}}>
              <button onClick={() => setShowLangs(!showLangs)}
                style={{display:"flex",alignItems:"center",gap:6,background:"#f9f9f9",border:"1px solid #e5e7eb",borderRadius:8,padding:"6px 10px",fontSize:13,fontWeight:600,cursor:"pointer",color:"#374151"}}>
                <span>{selectedLang.flag}</span>
                <span>{selectedLang.label}</span>
                <span style={{fontSize:10}}>▼</span>
              </button>
              {showLangs && (
                <div style={{position:"absolute",top:"100%",right:0,marginTop:4,background:"white",border:"1px solid #e5e7eb",borderRadius:10,boxShadow:"0 4px 12px rgba(0,0,0,0.1)",overflow:"hidden",zIndex:100,minWidth:150}}>
                  {LANGUAGES.map(l => (
                    <button key={l.id} onClick={() => handleLanguageChange(l.id)}
                      style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:lang===l.id?"#fff1f2":"white",border:"none",cursor:"pointer",fontSize:13,color:lang===l.id?"#dc0000":"#374151",textAlign:"left"}}>
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                      {lang===l.id && <span style={{marginLeft:"auto",color:"#dc0000"}}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link href="/auth/login" style={{color:"#dc0000",textDecoration:"none",padding:"6px 14px",borderRadius:8,fontSize:14,fontWeight:700}}>{t.signin}</Link>
            <Link href="/auth/login" style={{background:"#dc0000",color:"white",textDecoration:"none",padding:"8px 18px",borderRadius:10,fontSize:14,fontWeight:700}}>{t.getstarted}</Link>
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
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(220,0,0,0.08)",color:"#dc0000",padding:"6px 16px",borderRadius:999,fontSize:13,fontWeight:600,marginBottom:24}}>{t.badge}</div>
          <h1 style={{fontSize:"clamp(2.5rem,6vw,4.5rem)",fontWeight:900,lineHeight:1.1,marginBottom:16,color:"#1a1a1a"}}>{t.hero1}</h1>
          <h2 style={{fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:"#dc0000",marginBottom:24}}>{t.hero2}</h2>
          <p style={{fontSize:"1.15rem",color:"#555",maxWidth:560,margin:"0 auto 16px",lineHeight:1.7}}>
            {t.hero3} <strong style={{color:"#dc0000"}}>{t.hero4}</strong>, <strong style={{color:"#1a1a1a"}}>{t.hero5}</strong>, {lang==="en"?"and":lang==="tet"?"no":lang==="pt"?"e":lang==="id"?"dan":lang==="zh"?"和":"und"} <strong style={{color:"#b8860b"}}>{t.hero6}</strong>.
          </p>
          <p style={{fontSize:"1rem",color:"#777",marginBottom:40}}>{t.hero7} <strong style={{color:"#dc0000"}}>{t.hero8}</strong></p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/auth/login" style={{display:"inline-flex",alignItems:"center",gap:8,background:"#dc0000",color:"white",textDecoration:"none",padding:"14px 32px",borderRadius:14,fontSize:16,fontWeight:700}}>
              {t.cta1} <ArrowRight size={18} />
            </Link>
            <Link href="/auth/login" style={{display:"inline-flex",alignItems:"center",gap:8,background:"white",color:"#dc0000",textDecoration:"none",padding:"14px 32px",borderRadius:14,fontSize:16,fontWeight:700,border:"2px solid #dc0000"}}>
              {t.cta2}
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section id="about" style={{padding:"80px 2rem",textAlign:"center",background:"#fff"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <h2 style={{fontSize:"2.2rem",fontWeight:800,marginBottom:8,color:"#1a1a1a"}}>{t.whatwe}</h2>
          <p style={{color:"#777",marginBottom:56,fontSize:"1.05rem"}}>{t.whatwesub}</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:32}}>
            {[
              {icon:"🎓",color:"#dc0000",title:t.teach,desc:t.teachdesc},
              {icon:"🔬",color:"#1a1a1a",title:t.research,desc:t.researchdesc},
              {icon:"🛠️",color:"#b8860b",title:t.build,desc:t.builddesc},
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
          <h2 style={{fontSize:"2.2rem",fontWeight:800,textAlign:"center",marginBottom:8,color:"#1a1a1a"}}>{t.feat}</h2>
          <p style={{color:"#777",textAlign:"center",marginBottom:48,fontSize:"1.05rem"}}>{t.featsub}</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20}}>
            {t.features.map(({label,desc},i) => (
              <div key={label} style={{background:"white",borderRadius:20,padding:"1.5rem",border:"1px solid #f0f0f0",borderTop:`3px solid ${colors[i]}`,display:"flex",flexDirection:"column",gap:12}}>
                <div style={{width:44,height:44,background:bgs[i],borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",color:colors[i]}}>{icons[i]}</div>
                <h3 style={{fontWeight:700,fontSize:"1rem",margin:0,color:colors[i]}}>{label}</h3>
                <p style={{color:"#666",fontSize:"0.9rem",lineHeight:1.6,margin:0}}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:40}}>
            <Link href="/auth/login" style={{display:"inline-flex",alignItems:"center",gap:8,background:"#dc0000",color:"white",textDecoration:"none",padding:"14px 36px",borderRadius:14,fontSize:16,fontWeight:700}}>
              {t.startfree} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOR WHO */}
      <section style={{padding:"80px 2rem",background:"#fff"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <h2 style={{fontSize:"2.2rem",fontWeight:800,textAlign:"center",marginBottom:8}}>{t.everyone}</h2>
          <p style={{color:"#777",textAlign:"center",marginBottom:48,fontSize:"1.05rem"}}>{t.everyonesub}</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
            {t.forWho.map(({icon,title,items},i) => (
              <div key={title} style={{background:"white",borderRadius:20,padding:"1.5rem",border:"1px solid #f0f0f0",borderTop:`3px solid ${forWhoColors[i]}`}}>
                <div style={{width:52,height:52,background:`${forWhoColors[i]}15`,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:14}}>{icon}</div>
                <h3 style={{fontWeight:700,marginBottom:12,color:forWhoColors[i]}}>{title}</h3>
                {items.map(item => (
                  <a key={item} href="/auth/login" style={{display:"block",color:forWhoColors[i],fontSize:"0.875rem",textDecoration:"none",marginBottom:6,fontWeight:500}}>{item} →</a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" style={{padding:"80px 2rem",background:"#fffdf0",textAlign:"center"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <h2 style={{fontSize:"2.2rem",fontWeight:800,marginBottom:8,color:"#dc0000"}}>{t.team}</h2>
          <p style={{color:"#777",marginBottom:48,fontSize:"1.05rem"}}>{t.teamsub}</p>
          <div style={{background:"white",borderRadius:28,padding:"2.5rem",border:"2px solid #ffc700",maxWidth:480,margin:"0 auto",boxShadow:"0 8px 40px rgba(220,0,0,0.1)"}}>
            <img src="https://i.postimg.cc/DwFCp429/profile-jpg.jpg" alt="Osorio Soarez"
              style={{width:140,height:140,borderRadius:"50%",objectFit:"cover",border:"4px solid #dc0000",marginBottom:20}} />
            <h3 style={{fontWeight:800,fontSize:"1.4rem",marginBottom:4,color:"#1a1a1a"}}>Osorio Soarez</h3>
            <p style={{color:"#dc0000",fontWeight:700,marginBottom:8,fontSize:"0.95rem"}}>{t.role}</p>
            <p style={{color:"#888",fontSize:"0.875rem",marginBottom:4}}>🎓 {t.masters}</p>
            <p style={{color:"#888",fontSize:"0.875rem",marginBottom:16}}>🇹🇱 {t.from}</p>
            <p style={{color:"#555",fontSize:"0.9rem",lineHeight:1.7,marginBottom:20}}>{t.bio}</p>
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
          <h2 style={{fontSize:"2.2rem",fontWeight:800,marginBottom:8}}>{t.contact}</h2>
          <p style={{color:"#777",marginBottom:40,fontSize:"1.05rem"}}>{t.contactsub}</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:32}}>
            {[
              {icon:"✉️",label:"Email",value:"suarezoso27@gmail.com",href:"mailto:suarezoso27@gmail.com",color:"#dc0000"},
              {icon:"💼",label:"LinkedIn",value:"osorio-soarez",href:"https://www.linkedin.com/in/osorio-soarez",color:"#1a1a1a"},
              {icon:"💻",label:"GitHub",value:"SoarezTL",href:"https://github.com/SoarezTL",color:"#1a1a1a"},
              {icon:"🎓",label:"University",value:"USTC, Hefei, China",href:"https://en.ustc.edu.cn",color:"#b8860b"},
            ].map(({icon,label,value,href,color}) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{background:"#fff8e1",borderRadius:16,padding:"1.25rem",textDecoration:"none",color:"inherit",border:"1px solid #ffc700",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
                <span style={{fontSize:24}}>{icon}</span>
                <span style={{fontWeight:600,fontSize:"0.875rem",color:"#888"}}>{label}</span>
                <span style={{fontWeight:700,fontSize:"0.875rem",color}}>{value}</span>
              </a>
            ))}
          </div>
          <Link href="/auth/login" style={{display:"inline-flex",alignItems:"center",gap:8,background:"#dc0000",color:"white",textDecoration:"none",padding:"14px 36px",borderRadius:14,fontSize:16,fontWeight:700}}>
            {t.startusing} <ArrowRight size={18} />
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
            <p style={{color:"#aaa",fontSize:"0.875rem",maxWidth:260}}>{t.footer}</p>
          </div>
          <div style={{display:"flex",gap:32,flexWrap:"wrap"}}>
            {[
              {title:t.platform,links:["Study","Math","Code","Quiz","Lesson","Research"]},
              {title:t.company,links:["About","Team","Contact","GitHub"]},
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
        <div style={{maxWidth:1100,margin:"24px auto 0",borderTop:"1px solid #333",paddingTop:20}}>
          <p style={{color:"#666",fontSize:"0.8rem",textAlign:"center"}}>© {new Date().getFullYear()} {t.copyright}</p>
        </div>
      </footer>

    </main>
  )
}
