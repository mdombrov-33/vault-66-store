import Image from 'next/image'
import { emojiData } from '@/data/profile/vault-log/emoji-data'
import { ChatWindowProps } from '@/types/profile'

const shortcodeToSrc = emojiData.reduce<Record<string, string>>((acc, { shortcode, src }) => {
  acc[shortcode] = src
  return acc
}, {})

export default function ChatWindow({ messages, bottomRef }: ChatWindowProps) {
  function renderContentWithEmojis(content: string) {
    const regex = /(:[a-z0-9]+?:)/g

    const parts = content.split(regex)

    return parts.map((part, i) => {
      if (part.match(regex) && shortcodeToSrc[part]) {
        return (
          <Image
            key={i}
            src={shortcodeToSrc[part]}
            alt={part}
            width={40}
            height={40}
            className="inline-block mt-[2px] mx-[2px]"
          />
        )
      }
      return <span key={i}>{part}</span>
    })
  }

  return (
    <div
      className="flex-1 overflow-y-auto space-y-2 mt-4 px-1 text-xl font-[roboto-mono]"
      aria-live="polite"
    >
      {messages.map((msg, idx) => (
        <p key={idx} className="whitespace-pre-wrap leading-snug">
          <span className="text-sm text-muted-foreground mr-2">
            {new Date(msg.sentAt).toLocaleTimeString()}
          </span>
          {msg.senderAvatar && (
            <Image
              src={msg.senderAvatar}
              alt={`${msg.senderName}'s avatar`}
              width={24}
              height={24}
              className="inline-block rounded-full mr-2"
            />
          )}
          <span className="font-semibold text-md md:text-xl">{msg.senderName}:</span>{' '}
          {renderContentWithEmojis(msg.content)}
        </p>
      ))}
      {bottomRef && <div ref={bottomRef} />}
    </div>
  )
}
