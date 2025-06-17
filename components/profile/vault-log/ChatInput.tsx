'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChatInputProps } from '@/types/profile'

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState('')

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
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 font-roboto text-xl"
        placeholder="Input command or message"
        aria-label="Input command or message"
      />
      <Button type="submit" variant="default" className="text-3xl">
        Send
      </Button>
    </form>
  )
}
