import { useState, useRef, useEffect } from "react";
import { useChatStorage } from "@/components/ai-chat/hooks/useChatStorage";
import { useAutoScroll } from "@/components/ai-chat/hooks/useAutoScroll";
import ChatMessages from "@/components/ai-chat/ChatMessages";
import ChatInput from "@/components/ai-chat/ChatInput";
import { sendMessage } from "@/components/ai-chat/send-message";

//* Define the expiration time for chat messages in localStorage
const EXPIRATION_MS = 1000 * 60 * 60; // 1 hour

function ChatInterface() {
  const [messages, setMessages] = useChatStorage("vault66-chat", EXPIRATION_MS);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  async function handleSend(): Promise<void> {
    await sendMessage({
      input,
      setInput,
      messages,
      setMessages,
      setIsLoading,
    });
  }

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
