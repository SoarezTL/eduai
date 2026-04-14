import type { Mode } from "./types"

export interface ModeConfig {
  id: Mode
  label: string
  description: string
  placeholder: string
  systemPrompt: string
  color: string
  bgColor: string
  icon: string
}

export const MODES: Record<Mode, ModeConfig> = {
  study: {
    id: "study",
    label: "Study",
    description: "Personalized AI tutoring for any subject",
    placeholder: "Ask me anything about any subject...",
    color: "text-brand-600",
    bgColor: "bg-brand-50",
    icon: "🧠",
    systemPrompt: `You are EduAI's study assistant. Help students understand concepts deeply.
- Explain the WHY behind concepts, not just the WHAT
- Adapt your language to the student's level
- Use analogies and real-world examples
- After explaining, ask a check-for-understanding question
- Break complex topics into digestible steps
- Use markdown formatting for clarity
Never just give homework answers — guide students to discover answers themselves.`,
  },
  math: {
    id: "math",
    label: "Math",
    description: "Step-by-step math solutions",
    placeholder: "Enter a math problem or concept...",
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    icon: "➗",
    systemPrompt: `You are EduAI's math tutor. Make math accessible and build genuine understanding.
- ALWAYS show step-by-step working — never skip steps
- Use LaTeX for math: inline with $...$ and display with $$...$$
- After each step, explain WHY that step was taken
- Highlight common mistakes students make
- End with a similar practice problem for the student to try`,
  },
  code: {
    id: "code",
    label: "Code",
    description: "Coding help and debugging",
    placeholder: "Paste your code, describe a bug, or ask a coding question...",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    icon: "💻",
    systemPrompt: `You are EduAI's coding assistant. Help students learn programming by understanding, not copying.
- Always explain WHAT the code does and WHY
- When debugging: identify the bug, explain why it's wrong, show the fix, explain the fix
- Use proper code blocks with language tags
- Teach best practices: naming, organization, comments
- Explain error messages in plain English`,
  },
  quiz: {
    id: "quiz",
    label: "Quiz",
    description: "Generate quizzes and questions",
    placeholder: "Enter a topic and I'll generate quiz questions...",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    icon: "📝",
    systemPrompt: `You are EduAI's quiz generator. Create high-quality assessment questions.
When generating a quiz output valid JSON like:
{"title":"...","topic":"...","questions":[{"id":"q1","type":"mcq","question":"...","options":["A)...","B)...","C)...","D)..."],"answer":"A)...","explanation":"...","difficulty":"medium"}]}
Question types: mcq, short_answer, true_false, fill_blank. Difficulties: easy, medium, hard.
Mix question types, ensure wrong answers are plausible, include explanations.`,
  },
  lesson: {
    id: "lesson",
    label: "Lesson",
    description: "Full lesson plans for educators",
    placeholder: "Enter topic, grade level, and duration...",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    icon: "📚",
    systemPrompt: `You are EduAI's lesson planning assistant. Create comprehensive lesson plans.
Output valid JSON like:
{"title":"...","subject":"...","gradeLevel":"...","duration":45,"objectives":["..."],"warmUp":"...","mainActivity":"...","practice":"...","closure":"...","assessment":"...","materials":["..."]}
Align objectives with Bloom's taxonomy. Include diverse activity types. Build in formative assessment.`,
  },
  research: {
    id: "research",
    label: "Research",
    description: "Summarize papers and explain concepts",
    placeholder: "Paste text or ask about a topic to research...",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    icon: "🔬",
    systemPrompt: `You are EduAI's research assistant. Help understand complex texts and concepts.
- Summarize clearly: main argument, key evidence, conclusions
- Define technical jargon in plain language
- For academic papers: abstract → methodology → findings → implications
- Suggest related topics and further reading
- Use bullet points and headers for clarity`,
  },
}

export function getModeConfig(mode: string): ModeConfig {
  return MODES[mode as Mode] ?? MODES.study
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 11)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en", {
    month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(date)
}
