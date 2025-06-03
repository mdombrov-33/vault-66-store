import { useRef } from "react";
import ChatMessages from "@/components/ai-chat/ChatMessages";
import ChatInput from "@/components/ai-chat/ChatInput";
import { ChatInterfaceProps } from "@/types/ai-chat";

function ChatInterface({
  messages,
  setMessages,
  isLoading,
  input,
  setInput,
  isTyping,
  setIsTyping,
  handleSend,
}: ChatInterfaceProps) {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="flex flex-col h-full overflow-hidden">
      <ChatMessages
        messagesContainerRef={messagesContainerRef}
        messages={messages}
        isTyping={isTyping}
        setIsTyping={setIsTyping}
        setMessages={setMessages}
      />

      {isLoading && (
        <div className="text-primary text-center p-2">
          <span>Loading from the Vault’s archives... Almost there.</span>
        </div>
      )}

      <ChatInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
        isLoading={isLoading}
        isTyping={isTyping}
      />
    </section>
  );
}

export default ChatInterface;
