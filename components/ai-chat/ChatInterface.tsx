import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TypeAnimation } from "react-type-animation";
import { useChatStorage } from "@/components/ai-chat/useChatStorage";
import { useAutoScroll } from "@/components/ai-chat/useAutoScroll";

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

  //* Handle sending a new message
  //* This function sends the user's input to the server and updates the chat
  async function handleSend() {
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
        // Add hasAnimated: false so the new bot message will animate
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
      {/* Chat messages container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto overflow-x-auto border rounded whitespace-pre-wrap break-words p-2 space-y-2 bg-accent text-sm"
      >
        {messages.map((msg, i) => {
          if (msg.role === "user") {
            return (
              <div
                key={i}
                className="p-2 rounded text-2xl bg-primary text-primary-foreground self-end"
              >
                {msg.content.trim()}
              </div>
            );
          } else {
            //* If already animated, just show instantly
            if (msg.hasAnimated) {
              return (
                <div
                  key={i}
                  className="p-2 rounded text-2xl bg-muted self-start text-muted-foreground"
                >
                  {msg.content.trim()}
                </div>
              );
            }

            //* Animate only messages that are not animated yet
            return (
              <TypeAnimation
                key={i}
                sequence={[
                  () => setIsTyping(true), // typing started
                  msg.content.trim(),
                  100,
                  () => {
                    setIsTyping(false); // typing finished
                    // Mark message as animated
                    setMessages((prev) => {
                      const newMessages = [...prev];
                      if (newMessages[i]) {
                        newMessages[i] = {
                          ...newMessages[i],
                          hasAnimated: true,
                        };
                      }
                      return newMessages;
                    });
                  },
                ]}
                speed={85}
                wrapper="div"
                className="p-2 rounded text-2xl bg-muted self-start text-muted-foreground"
                cursor={false}
              />
            );
          }
        })}
      </div>

      {/* Loading response*/}
      {isLoading && (
        <div className="text-muted-foreground text-center p-2">
          <span>Loading from the Vault’s archives... Almost there.</span>
        </div>
      )}

      {/* Input area */}
      <div className="mt-4 flex items-center gap-2">
        <Textarea
          className="flex-1 resize-none"
          rows={2}
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            !e.shiftKey &&
            (e.preventDefault(), handleSend())
          }
          disabled={isLoading || isTyping}
        />
        <Button onClick={handleSend} disabled={isLoading || isTyping}>
          Send
        </Button>
      </div>
    </section>
  );
}

export default ChatInterface;
