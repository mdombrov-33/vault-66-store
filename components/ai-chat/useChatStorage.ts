import { useEffect, useState } from "react";
import { Message } from "@/types/ai-chat";

export function useChatStorage(key: string, expirationMs: number) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Date.now() - parsed.timestamp < expirationMs) {
          const loadedMessages: Message[] = parsed.messages.map(
            (msg: Message) =>
              msg.role === "user" ? msg : { ...msg, hasAnimated: true }
          );
          setMessages(loadedMessages);
        } else {
          localStorage.removeItem(key);
        }
      } catch (e) {
        console.error("Failed to parse saved chat:", e);
      }
    }
  }, [key, expirationMs]);

  useEffect(() => {
    if (messages.length === 0) return;

    const saved = localStorage.getItem(key);
    let timestamp = Date.now();
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.timestamp) timestamp = parsed.timestamp;
      } catch (e) {
        console.error("Failed to parse previous chat state:", e);
      }
    }
    localStorage.setItem(key, JSON.stringify({ messages, timestamp }));
  }, [messages, key]);

  return [messages, setMessages] as const;
}
