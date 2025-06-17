import { RefObject } from 'react'

interface ChatWindowProps {
  messages: string[]
  bottomRef: RefObject<HTMLDivElement | null>
}

export default function ChatWindow({ messages, bottomRef }: ChatWindowProps) {
  return (
    <div
      className="flex-1 overflow-y-auto space-y-2 mt-4 px-1 text-xl font-roboto"
      aria-live="polite"
    >
      {messages.map((msg, idx) => (
        <p key={idx} className="whitespace-pre-wrap leading-snug">
          {msg}
        </p>
      ))}
      {bottomRef && <div ref={bottomRef} />}
    </div>
  )
}
