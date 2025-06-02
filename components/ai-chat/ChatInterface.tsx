import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TypeAnimation } from "react-type-animation";

const EXPIRATION_MS = 1000 * 60 * 60; // 1 hour

type Message = {
  role: string;
  content: string;
  hasAnimated?: boolean;
};

function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const justLoadedRef = useRef(true); // to detect first load
  const lastMessageCountRef = useRef(0); // track messages count for new messages

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

  //* Load chat and scroll position from localStorage on mount
  useEffect(() => {
    const savedChat = localStorage.getItem("vault66-chat");
    const savedScroll = localStorage.getItem("vault66-chat-scroll");

    if (savedChat) {
      try {
        const parsed = JSON.parse(savedChat);

        if (Date.now() - parsed.timestamp < EXPIRATION_MS) {
          // Mark loaded bot messages as already animated so they show instantly
          const loadedMessages: Message[] = parsed.messages.map(
            (msg: Message) =>
              msg.role === "user" ? msg : { ...msg, hasAnimated: true }
          );
          setMessages(loadedMessages);
        } else {
          localStorage.removeItem("vault66-chat");
        }
      } catch (e) {
        console.error("Failed to parse saved chat:", e);
      }
    }

    if (savedScroll) {
      // Save scroll position for later restore
      scrollToSavedPosition(savedScroll);
    }
  }, []);

  // Helper to scroll to saved position after mount and messages rendered
  const scrollToSavedPosition = (savedScroll: string) => {
    // Wait a tick for rendering
    setTimeout(() => {
      if (messagesContainerRef.current) {
        const pos = parseInt(savedScroll, 10);
        messagesContainerRef.current.scrollTo({ top: pos, behavior: "auto" });
      }
    }, 0);
  };

  //* Save chat to localStorage whenever messages change
  useEffect(() => {
    if (messages.length === 0) return;

    // Save messages with timestamp
    const saved = localStorage.getItem("vault66-chat");
    let timestamp = Date.now();

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.timestamp) {
          timestamp = parsed.timestamp; // reuse original timestamp
        }
      } catch (e) {
        console.error("Failed to parse previous chat state:", e);
      }
    }

    const payload = { messages, timestamp };
    localStorage.setItem("vault66-chat", JSON.stringify(payload));
  }, [messages]);

  //* Save scroll position on user scroll
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      localStorage.setItem(
        "vault66-chat-scroll",
        container.scrollTop.toString()
      );
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  //* Handle scrolling behavior when messages or typing changes
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    // On first load, restore scroll position (already handled in effect above)
    if (justLoadedRef.current) {
      justLoadedRef.current = false;
      lastMessageCountRef.current = messages.length;
      return; // Don't scroll to bottom yet
    }

    // If new messages arrived (count increased) and not typing, scroll to bottom
    if (messages.length > lastMessageCountRef.current && !isTyping) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }

    lastMessageCountRef.current = messages.length;
  }, [messages, isTyping]);

  //* While typing, keep scrolling down smoothly every frame
  useEffect(() => {
    if (!isTyping) return;

    let refId: number;
    const scroll = () => {
      if (!messagesContainerRef.current) return;

      const container = messagesContainerRef.current;
      container.scrollBy({ top: 10, behavior: "smooth" });

      refId = requestAnimationFrame(scroll);
    };

    refId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(refId);
  }, [isTyping]);

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
