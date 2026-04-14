import { getModeConfig } from "@/lib/modes"
import type { Mode } from "@/lib/types"

export function ThinkingIndicator({ mode }: { mode?: Mode }) {
  const cfg = getModeConfig(mode ?? "study")
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${cfg.bgColor}`}
           style={{ fontSize: 14 }}>
        {cfg.icon}
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        <span className="thinking-dot" />
        <span className="thinking-dot" />
        <span className="thinking-dot" />
      </div>
    </div>
  )
}
