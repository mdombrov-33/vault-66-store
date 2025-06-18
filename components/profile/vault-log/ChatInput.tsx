'use client'

import { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChatInputProps } from '@/types/profile'
import { emojiData } from '@/data/profile/vault-log/emoji-data'

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const insertEmoji = (shortcode: string) => {
    const input = inputRef.current
    if (!input) return

    const start = input.selectionStart || 0
    const end = input.selectionEnd || 0

    const before = text.slice(0, start)
    const after = text.slice(end)

    const newText = before + shortcode + after
    setText(newText)

    // Move cursor to after inserted emoji
    setTimeout(() => {
      input.focus()
      input.setSelectionRange(start + shortcode.length, start + shortcode.length)
    }, 0)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (text.trim()) {
          onSend(text)
          setText('')
        }
      }}
      className="flex items-center gap-2 pt-4"
      role="search"
      aria-label="Chat input"
    >
      <span className="font-vt323 text-lg text-primary" aria-hidden="true">
        &gt;
      </span>

      <Input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 font-roboto text-xl"
        placeholder="Input command or message"
        aria-label="Input command or message"
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button type="button" variant="ghost" size="icon" aria-label="Open emoji picker">
            🙂
          </Button>
        </PopoverTrigger>

        <PopoverContent
          side="top"
          className="grid grid-cols-4 gap-2 p-2 w-48 bg-card rounded-xl shadow-md"
        >
          {emojiData.map(({ shortcode, src }) => (
            <button
              key={shortcode}
              type="button"
              onClick={() => insertEmoji(shortcode)}
              className="hover:scale-110 transition-transform"
              title={shortcode}
            >
              <img src={src} alt={shortcode} className="w-8 h-8" />
            </button>
          ))}
        </PopoverContent>
      </Popover>

      <Button type="submit" variant="default" className="text-3xl">
        Send
      </Button>
    </form>
  )
}
