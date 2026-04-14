"use client"

import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import type { Components } from "react-markdown"

const components: Components = {
  code({ className, children }) {
    const isBlock = className?.includes("language-")
    const lang = className?.replace("language-", "") ?? ""
    if (isBlock) {
      return (
        <div className="my-3">
          {lang && (
            <div className="bg-gray-800 text-gray-400 text-xs px-4 py-1.5 rounded-t-xl font-mono">
              {lang}
            </div>
          )}
          <pre className={`bg-gray-900 text-gray-100 p-4 overflow-x-auto text-xs font-mono leading-relaxed ${lang ? "rounded-b-xl" : "rounded-xl"}`}>
            <code>{children}</code>
          </pre>
        </div>
      )
    }
    return (
      <code className="bg-gray-100 text-brand-700 px-1.5 py-0.5 rounded text-xs font-mono">
        {children}
      </code>
    )
  },
  table({ children }) {
    return (
      <div className="overflow-x-auto my-3">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    )
  },
  th({ children }) {
    return <th className="bg-gray-50 border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">{children}</th>
  },
  td({ children }) {
    return <td className="border border-gray-200 px-3 py-2 text-gray-700">{children}</td>
  },
  blockquote({ children }) {
    return <blockquote className="border-l-4 border-brand-300 pl-4 italic text-gray-600 my-3">{children}</blockquote>
  },
}

export function MessageRenderer({ content }: { content: string }) {
  return (
    <div className="prose-chat">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
