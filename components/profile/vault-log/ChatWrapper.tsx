'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import io from 'socket.io-client'
import ChatWindow from './ChatWindow'
import ChatInput from './ChatInput'
import { createChatMessage } from '@/utils/actions/live-chat'
import { renderError } from '@/utils/render-error'
import { ChatWrapperProps, Message, SocketMessage } from '@/types/profile'

function ChatWrapper({ messages: initialMessages, displayedName, senderAvatar }: ChatWrapperProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [isPending, startTransition] = useTransition()

  const clientIdRef = useRef<string>(crypto.randomUUID())
  const socket = useRef(io('https://vault66-chat-server.onrender.com')).current

  useEffect(() => {
    const handleIncoming = (msg: SocketMessage) => {
      if (msg.clientId === clientIdRef.current) return // avoid echo of own message
      setMessages((prev) => [...prev, { ...msg, sentAt: new Date(msg.sentAt) }])
    }

    socket.on('chat message', handleIncoming)
    return () => {
      socket.off('chat message', handleIncoming)
    }
  }, [socket])

  const handleSend = (text: string) => {
    if (!text.trim()) return

    const optimisticMessage: SocketMessage = {
      id: crypto.randomUUID(),
      content: text,
      clerkId: 'optimistic',
      senderName: displayedName,
      senderAvatar,
      sentAt: new Date(),
      chatRoomId: '',
      clientId: clientIdRef.current,
    }

    setMessages((prev) => [...prev, optimisticMessage])

    socket.emit('chat message', {
      ...optimisticMessage,
      sentAt: optimisticMessage.sentAt.toISOString(),
    })

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
      className="flex flex-col h-dvh max-h-[60dvh] rounded-xl border p-4 bg-card text-card-foreground mb-28 sm:mb-22"
      role="main"
      aria-label="Live chat window"
    >
      <header className="pb-3 border-b border-foreground font-[roboto-mono] text-3xl">
        Vault 66 Comms Terminal
      </header>

      <ChatWindow messages={messages} bottomRef={bottomRef} />
      <ChatInput onSend={handleSend} disabled={isPending} />
    </section>
  )
}

export default ChatWrapper
