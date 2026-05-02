"use client"
import { MODES } from "@/lib/modes"
import { useChatStore } from "@/lib/store"
import type { Mode, Language } from "@/lib/types"

const SUGGESTIONS: Record<Language, Record<Mode, string[]>> = {
  en: {
    study:    ["Explain photosynthesis simply", "What caused World War I?", "Help me understand Newton's laws", "Difference between DNA and RNA?"],
    math:     ["Solve: 3x² + 5x - 2 = 0", "Explain integration by parts", "Find the derivative of sin(x²)", "What is the Pythagorean theorem?"],
    code:     ["Explain recursion with an example", "How does async/await work in JS?", "What is a linked list?", "Debug my Python code"],
    quiz:     ["5 MCQs on photosynthesis", "Quiz on World War II — medium", "10 math questions for grade 8", "Quiz me on Python basics"],
    lesson:   ["Fractions for grade 5, 45 mins", "Lesson on Shakespeare's Hamlet", "Intro to coding for beginners", "Climate change for high school"],
    research: ["Summarize this paper for me", "Explain quantum entanglement simply", "What is CRISPR gene editing?", "What is dark matter?"],
    exam:     ["I have SAT in 3 weeks, help me prep", "Build me an IELTS study plan", "Quiz me on exam topics", "What are the most important topics?"],
    photo:    ["Upload a math problem photo", "Take a photo of your homework", "Snap a whiteboard problem", "Upload a textbook page to explain"],
  },
  tet: {
    study:    ["Esplika fotosintese ho simples", "Saida mak kauza Gera Mundial I?", "Ajuda hau komprende lei Newton", "Diferensa entre DNA no RNA?"],
    math:     ["Rezolve: 3x² + 5x - 2 = 0", "Esplika integrasaun husi parte", "Hetan derivativu sin(x²)", "Saida mak teorema Pitágoras?"],
    code:     ["Esplika rekursaun ho ezemplu", "Async/await servisu oinsá iha JS?", "Saida mak lista ligadu?", "Debug kódigu Python hau"],
    quiz:     ["Pergunta 5 MCQ kona-ba fotosintese", "Quiz kona-ba Gera Mundial II", "Pergunta matematika 10 ba grau 8", "Quiz Python báziku"],
    lesson:   ["Fraksaun ba grau 5, minutu 45", "Lisaun kona-ba Hamlet Shakespeare", "Introdusaun kodifikasaun ba prinsipiante", "Mudansa klimátika ba eskola segundáriu"],
    research: ["Rezume papel ida ba hau", "Esplika enredasaun kuántiku", "Saida mak edisaun jén CRISPR?", "Saida mak matéria nakukun?"],
    exam:     ["Hau iha SAT iha semana 3, ajuda hau", "Harii planu estudu IELTS ba hau", "Quiz hau kona-ba tópiku ezame", "Saida mak tópiku importante liu?"],
    photo:    ["Karrega foto problema matematika", "Foto tarefa uma-kain nian", "Foto problema quadro branku", "Karrega pájina livru skolástiku"],
  },
  pt: {
    study:    ["Explique fotossíntese de forma simples", "O que causou a Primeira Guerra Mundial?", "Ajude-me a entender as leis de Newton", "Diferença entre DNA e RNA?"],
    math:     ["Resolva: 3x² + 5x - 2 = 0", "Explique integração por partes", "Encontre a derivada de sin(x²)", "Qual é o teorema de Pitágoras?"],
    code:     ["Explique recursão com um exemplo", "Como funciona async/await em JS?", "O que é uma lista ligada?", "Depure meu código Python"],
    quiz:     ["5 perguntas sobre fotossíntese", "Quiz sobre a Segunda Guerra Mundial", "10 questões de matemática para o 8º ano", "Quiz de Python básico"],
    lesson:   ["Frações para o 5º ano, 45 min", "Aula sobre Hamlet de Shakespeare", "Introdução à programação para iniciantes", "Mudanças climáticas para o ensino médio"],
    research: ["Resuma este artigo para mim", "Explique o entrelaçamento quântico", "O que é edição genética CRISPR?", "O que é matéria escura?"],
    exam:     ["Tenho o SAT em 3 semanas, me ajude", "Crie um plano de estudo para o IELTS", "Me questione sobre tópicos do exame", "Quais são os tópicos mais importantes?"],
    photo:    ["Envie foto de problema de matemática", "Tire foto da sua lição de casa", "Foto de problema no quadro branco", "Envie página do livro para explicar"],
  },
  id: {
    study:    ["Jelaskan fotosintesis dengan sederhana", "Apa yang menyebabkan Perang Dunia I?", "Bantu saya memahami hukum Newton", "Perbedaan antara DNA dan RNA?"],
    math:     ["Selesaikan: 3x² + 5x - 2 = 0", "Jelaskan integrasi parsial", "Cari turunan sin(x²)", "Apa teorema Pythagoras?"],
    code:     ["Jelaskan rekursi dengan contoh", "Bagaimana cara kerja async/await di JS?", "Apa itu linked list?", "Debug kode Python saya"],
    quiz:     ["5 soal pilihan ganda tentang fotosintesis", "Kuis tentang Perang Dunia II", "10 soal matematika kelas 8", "Kuis dasar Python"],
    lesson:   ["Pecahan untuk kelas 5, 45 menit", "Pelajaran tentang Hamlet Shakespeare", "Pengantar coding untuk pemula", "Perubahan iklim untuk SMA"],
    research: ["Ringkas makalah ini untuk saya", "Jelaskan keterikatan kuantum", "Apa itu pengeditan gen CRISPR?", "Apa itu materi gelap?"],
    exam:     ["Saya punya SAT dalam 3 minggu, bantu saya", "Buat rencana belajar IELTS", "Uji saya tentang topik ujian", "Apa topik terpenting?"],
    photo:    ["Unggah foto soal matematika", "Foto pekerjaan rumah Anda", "Foto soal di papan tulis", "Unggah halaman buku untuk dijelaskan"],
  },
  zh: {
    study:    ["简单解释光合作用", "第一次世界大战的起因是什么?", "帮我理解牛顿定律", "DNA和RNA的区别?"],
    math:     ["解方程: 3x² + 5x - 2 = 0", "解释分部积分法", "求sin(x²)的导数", "什么是勾股定理?"],
    code:     ["用例子解释递归", "JS中async/await如何工作?", "什么是链表?", "调试我的Python代码"],
    quiz:     ["5道关于光合作用的选择题", "关于第二次世界大战的测验", "8年级10道数学题", "Python基础测验"],
    lesson:   ["5年级分数课，45分钟", "莎士比亚哈姆雷特课", "初学者编程入门", "高中气候变化课"],
    research: ["为我总结这篇论文", "简单解释量子纠缠", "什么是CRISPR基因编辑?", "什么是暗物质?"],
    exam:     ["我3周后考SAT，帮我备考", "为我制定雅思学习计划", "测验我关于考试主题", "最重要的主题是什么?"],
    photo:    ["上传数学题照片", "拍摄你的作业", "拍摄白板问题", "上传教科书页面解释"],
  },
  de: {
    study:    ["Erkläre Photosynthese einfach", "Was verursachte den Ersten Weltkrieg?", "Hilf mir, Newtons Gesetze zu verstehen", "Unterschied zwischen DNA und RNA?"],
    math:     ["Löse: 3x² + 5x - 2 = 0", "Erkläre Integration durch Teile", "Finde die Ableitung von sin(x²)", "Was ist der Satz des Pythagoras?"],
    code:     ["Erkläre Rekursion mit einem Beispiel", "Wie funktioniert async/await in JS?", "Was ist eine verkettete Liste?", "Debugge meinen Python-Code"],
    quiz:     ["5 Fragen zur Photosynthese", "Quiz über den Zweiten Weltkrieg", "10 Matheaufgaben für Klasse 8", "Python-Grundlagen-Quiz"],
    lesson:   ["Brüche für Klasse 5, 45 Min", "Unterricht über Shakespeares Hamlet", "Einführung in die Programmierung", "Klimawandel für die Oberschule"],
    research: ["Fasse dieses Paper für mich zusammen", "Erkläre Quantenverschränkung", "Was ist CRISPR-Genbearbeitung?", "Was ist dunkle Materie?"],
    exam:     ["Ich habe SAT in 3 Wochen, hilf mir", "Erstelle einen IELTS-Lernplan", "Teste mich zu Prüfungsthemen", "Was sind die wichtigsten Themen?"],
    photo:    ["Lade ein Foto einer Matheaufgabe hoch", "Foto deiner Hausaufgaben", "Foto eines Tafelproblems", "Lade eine Buchseite zum Erklären hoch"],
  },
}

export function WelcomeScreen({ mode, onSuggestion }: { mode: Mode; onSuggestion: (t: string) => void }) {
  const cfg = MODES[mode]
  const { currentLanguage } = useChatStore()
  const suggestions = SUGGESTIONS[currentLanguage]?.[mode] ?? SUGGESTIONS.en[mode]

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
