import { ChatWindowProps } from '@/types/profile'

export default function ChatWindow({ messages, bottomRef }: ChatWindowProps) {
  return (
    <div
      className="flex-1 overflow-y-auto space-y-2 mt-4 px-1 text-xl font-roboto"
      aria-live="polite"
    >
      {messages.map((msg, idx) => (
        <p key={idx} className="whitespace-pre-wrap leading-snug">
          <span className="text-sm text-muted-foreground mr-2">
            {new Date(msg.sentAt).toLocaleTimeString()}
          </span>
          {msg.senderAvatar && (
            <img
              src={msg.senderAvatar}
              alt={`${msg.senderName}'s avatar`}
              className="inline-block w-6 h-6 rounded-full mr-2"
            />
          )}
          <span className="font-semibold">{msg.senderName}:</span> {msg.content}
        </p>
      ))}
      {bottomRef && <div ref={bottomRef} />}
    </div>
  )
}
