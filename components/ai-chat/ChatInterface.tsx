import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function ChatInterface() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  async function handleSend() {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    setInput("");

    try {
      setIsLoading(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

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

  useEffect(() => {
    //* Scroll the last message element (messagesEndRef) into view, aligned to top
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [messages]);

  return (
    <section className="flex flex-col h-full overflow-hidden">
      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto overflow-x-auto border rounded whitespace-pre-wrap break-words p-2 space-y-2 bg-accent text-sm">
        {messages.map((msg, i) => {
          const isLast = i === messages.length - 1;
          return (
            <div
              key={i}
              ref={isLast ? messagesEndRef : null}
              className={`p-2 rounded text-2xl ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground self-end"
                  : "bg-muted self-start text-muted-foreground"
              }`}
            >
              {msg.content.trim()}
            </div>
          );
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
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </section>
  );
}

export default ChatInterface;
