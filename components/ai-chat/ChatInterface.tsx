import { useState, useRef, useEffect } from "react";
import { useAutoScroll } from "@/components/ai-chat/hooks/useAutoScroll";
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useAutoScroll(
    messagesContainerRef as React.RefObject<HTMLDivElement>,
    isTyping,
    messages,
    isInitialLoad
  );

  useEffect(() => {
    if (messages.length > 0 && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [messages, isInitialLoad]);

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
        <div className="text-muted-foreground text-center p-2">
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
