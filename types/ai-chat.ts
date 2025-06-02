export type Message = {
  role: string;
  content: string;
  hasAnimated?: boolean;
};

export type SendMessageArgs = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ChatWindowProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isTyping: boolean;
  setIsTyping: (val: boolean) => void;
  messagesContainerRef: React.RefObject<HTMLDivElement | null>;
}

export interface ChatInputProps {
  input: string;
  setInput: (val: string) => void;
  isLoading: boolean;
  isTyping: boolean;
  onSend: () => void;
}
