import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TypeAnimation } from "react-type-animation";

const EXPIRATION_MS = 1000 * 60 * 60; // 1 hour

function ChatInterface() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

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
        setMessages((prev) => [...prev, data.message]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "Oops! Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  //* Load chat from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("vault66-chat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (Date.now() - parsed.timestamp < EXPIRATION_MS) {
          setMessages(parsed.messages);
        } else {
          // Too old — clear it
          localStorage.removeItem("vault66-chat");
        }
      } catch (e) {
        console.error("Failed to parse saved chat:", e);
      }
    }
  }, []);

  //* Save chat to localStorage whenever messages change
  useEffect(() => {
    // Don't save empty messages
    if (messages.length === 0) return;

    // Try to load existing timestamp
    const saved = localStorage.getItem("vault66-chat");
    let timestamp = Date.now();

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.timestamp) {
          timestamp = parsed.timestamp; // Reuse original timestamp
        }
      } catch (e) {
        console.error("Failed to parse previous chat state:", e);
      }
    }

    const payload = {
      messages,
      timestamp,
    };

    localStorage.setItem("vault66-chat", JSON.stringify(payload));
  }, [messages]);

  //* Scroll immediately to bottom when messages change, unless typing
  useEffect(() => {
    if (!isTyping) {
      messagesContainerRef.current?.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  //* While typing, keep scrolling down smoothly every frame
  useEffect(() => {
    if (isTyping) {
      let refId: number;

      const scroll = () => {
        if (!messagesContainerRef.current) return;

        const container = messagesContainerRef.current;

        container.scrollBy({ top: 10, behavior: "smooth" });

        refId = requestAnimationFrame(scroll);
      };

      refId = requestAnimationFrame(scroll);

      return () => cancelAnimationFrame(refId);
    }
  }, [isTyping]);

  return (
    <section className="flex flex-col h-full overflow-hidden">
      {/* Chat messages container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto overflow-x-auto border rounded whitespace-pre-wrap break-words p-2 space-y-2 bg-accent text-sm"
      >
        {messages.map((msg, i) => {
          const isLast = i === messages.length - 1;
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
            if (isLast) {
              return (
                <TypeAnimation
                  key={i}
                  sequence={[
                    () => setIsTyping(true), //* Triggers when typing starts
                    msg.content.trim(), //* The actual message
                    100, //*Optional pause after message
                    () => setIsTyping(false), //* Triggers after typing ends
                  ]}
                  speed={85}
                  wrapper="div"
                  className="p-2 rounded text-2xl bg-muted self-start text-muted-foreground"
                  cursor={false}
                />
              );
            } else {
              return (
                <div
                  key={i}
                  className="p-2 rounded text-2xl bg-muted self-start text-muted-foreground"
                >
                  {msg.content.trim()}
                </div>
              );
            }
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
