'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChatInputProps } from '@/types/profile'
import { emojiData } from '@/data/profile/vault-log/emoji-data'
import { useTypingSounds } from '@/hooks/useTypingSounds'
import { useSoundPlayer } from '@/hooks/useSoundPlayer'

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { playTypingSound, playEnterSound, playSpacebarSound } = useTypingSounds()
  const { playClick } = useSoundPlayer()

  const insertEmoji = (shortcode: string) => {
    const input = inputRef.current
    if (!input) return

    const start = input.selectionStart || 0
    const end = input.selectionEnd || 0

    const before = text.slice(0, start)
    const after = text.slice(end)

    const newText = before + shortcode + after
    setText(newText)

    setTimeout(() => {
      input.focus()
      input.setSelectionRange(start + shortcode.length, start + shortcode.length)
    }, 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      playEnterSound()
    } else if (e.key === ' ') {
      playSpacebarSound()
    }
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
        onChange={(e) => {
          setText(e.target.value)
          playTypingSound()
        }}
        onKeyDown={handleKeyDown}
        className="flex-1 font-[roboto-mono] text-xl"
        placeholder="Input command or message"
        aria-label="Input command or message"
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            className="text-2xl"
            variant="ghost"
            size="icon"
            aria-label="Open emoji picker"
          >
            <Image
              src="/icons/vaultboy-love.png"
              alt="Vault Boy Love Icon"
              width={32}
              height={32}
            />
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
              <Image src={src} alt={shortcode} width={32} height={32} className="w-8 h-8" />
            </button>
          ))}
        </PopoverContent>
      </Popover>

      <Button
        type="submit"
        variant="default"
        className="text-3xl"
        onClick={() => {
          if (text.trim()) {
            playClick()
          }
        }}
      >
        Send
      </Button>
    </form>
  )
}
