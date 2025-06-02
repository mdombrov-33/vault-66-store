"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useEffect } from "react";

// inside your ChatInterface component

function ChatInterface() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  async function handleSend() {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    if (data.message) {
      setMessages((prev) => [...prev, data.message]);
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="flex flex-col h-full overflow-hidden">
      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto border rounded p-2 space-y-2 bg-accent text-sm">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded text-2xl ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground self-end"
                : "bg-muted self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div ref={bottomRef} />

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
