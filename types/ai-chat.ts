import React from 'react'

export interface SendMessageArgs
  extends MessagesState,
    InputState,
    Pick<LoadingState, 'setIsLoading'> {}

export interface ChatInterfaceProps
  extends MessagesState,
    InputState,
    TypingState,
    Pick<LoadingState, 'isLoading'> {
  handleSend: () => Promise<void>
}

export interface ChatWindowProps extends MessagesState, TypingState {
  messagesContainerRef: React.RefObject<HTMLDivElement | null>
}

export interface ChatInputProps
  extends InputState,
    Pick<LoadingState, 'isLoading'>,
    Pick<TypingState, 'isTyping'> {
  onSend: () => void
}

export type Message = {
  role: string
  content: string
  hasAnimated?: boolean
}

//* Base types
type Setter<T> = React.Dispatch<React.SetStateAction<T>>

type MessagesState = {
  messages: Message[]
  setMessages: Setter<Message[]>
}

type InputState = {
  input: string
  setInput: Setter<string>
}

type LoadingState = {
  isLoading: boolean
  setIsLoading: Setter<boolean>
}

type TypingState = {
  isTyping: boolean
  setIsTyping: Setter<boolean>
}
