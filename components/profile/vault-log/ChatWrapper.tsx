'use client'

import { useEffect, useRef, useState } from 'react'
import ChatWindow from './ChatWindow'
import ChatInput from './ChatInput'

function ChatWrapper() {
  const [messages, setMessages] = useState<string[]>([
    '🧑‍💻 User1: Hello?',
    '🤖 VaultBot: Welcome to Vault 66 live chat.',
    '🧑‍💻 User1: Is anyone here?',
    '🧑‍💻 User1: Is anyone here?',
    '🧑‍💻 User1: Is anyone here?',
    '🧑‍💻 User1: Is anyone here?',
    '🧑‍💻 User1: Is anyone here?',
    '🧑‍💻 User1: Is anyone here?',
    '🧑‍💻 User1: Is anyone here?',
    '🧑‍💻 User1: Is anyone here?',
    '🧑‍💻 User1: Is anyone here?',
    '🧑‍💻 User1: Is anyone here?',
  ])
  const bottomRef = useRef<HTMLDivElement>(null)

  const handleSend = (text: string) => {
    if (!text.trim()) return
    setMessages((prev: string[]) => [...prev, `🧑‍💻 You: ${text}`])
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  })

  return (
    <section
      className="flex flex-col h-4/5 max-h-[90dvh] rounded-xl border p-4 bg-card text-card-foreground "
      role="main"
      aria-label="Live chat window"
    >
      <header className="pb-3 border-b border-muted font-roboto text-3xl">
        Live Terminal Chat
      </header>

      <ChatWindow messages={messages} bottomRef={bottomRef} />

      <ChatInput onSend={handleSend} />
    </section>
  )
}

export default ChatWrapper
