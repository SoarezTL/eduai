import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import "@/styles/globals.css"
import "katex/dist/katex.min.css"

export const metadata: Metadata = {
  title: "EduAI — Smart Learning Assistant",
  description: "AI-powered education platform for students and educators.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
