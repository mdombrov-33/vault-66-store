'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import ChatWindow from './ChatWindow'
import ChatInput from './ChatInput'
import { createChatMessage } from '@/utils/actions/live-chat'
import { renderError } from '@/utils/render-error'

function ChatWrapper() {
  const [messages, setMessages] = useState<string[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)
  const [isPending, startTransition] = useTransition()

  const handleSend = (text: string) => {
    if (!text.trim()) return

    setMessages((prev: string[]) => [...prev, `🧑‍💻 You: ${text}`])

    startTransition(async () => {
      try {
        await createChatMessage(text)
      } catch (error) {
        renderError(error)
      }
    })
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <section
      className="flex flex-col h-dvh :max-h-[55dvh] max-h-[60dvh] rounded-xl border p-4 bg-card text-card-foreground "
      role="main"
      aria-label="Live chat window"
    >
      <header className="pb-3 border-b border-muted font-roboto text-3xl">
        Live Terminal Chat
      </header>

      <ChatWindow messages={messages} bottomRef={bottomRef} />

      <ChatInput onSend={handleSend} disabled={isPending} />
    </section>
  )
}

export default ChatWrapper
