import { RefObject } from 'react'

export interface ChatWindowProps {
  messages: string[]
  bottomRef: RefObject<HTMLDivElement | null>
}

export interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}
