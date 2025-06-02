import { useState, useRef, useEffect } from "react";
import { useChatStorage } from "@/components/ai-chat/hooks/useChatStorage";
import { useAutoScroll } from "@/components/ai-chat/hooks/useAutoScroll";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

//* Define the expiration time for chat messages in localStorage
const EXPIRATION_MS = 1000 * 60 * 60; // 1 hour

function ChatInterface() {
  const [messages, setMessages] = useChatStorage("vault66-chat", EXPIRATION_MS);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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

  async function handleSend(): Promise<void> {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      setIsLoading(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();

      if (data.message) {
        setMessages((prev) => [
          ...prev,
          { ...data.message, hasAnimated: false },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "Oops! Something went wrong. Please try again.",
          hasAnimated: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

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
