import { useEffect, useState } from "react";
import { Message } from "@/types/ai-chat";

/**
 * Custom hook to persist chat messages to localStorage with optional expiration.
 *
 * Features:
 * - Loads stored messages on mount (if not expired)
 * - Automatically re-saves messages on change
 * - Filters out animation for non-user messages on reload (so they don't re-animate)
 *
 * @param key - localStorage key to use
 * @param expirationMs - time in milliseconds before stored chat expires
 */
export function useChatStorage(key: string, expirationMs: number) {
  const [messages, setMessages] = useState<Message[]>([]);

  /**
   * ✅ Load chat messages from localStorage on mount
   *
   * - Tries to parse the saved object (must have `messages` and `timestamp`)
   * - If not expired, sets the messages state
   * - Marks non-user messages with `hasAnimated: true` to avoid re-animation
   */
  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // If not expired
        if (Date.now() - parsed.timestamp < expirationMs) {
          const loadedMessages: Message[] = parsed.messages.map(
            (msg: Message) =>
              msg.role === "user" ? msg : { ...msg, hasAnimated: true }
          );
          setMessages(loadedMessages);
        } else {
          // Expired — remove from storage
          localStorage.removeItem(key);
        }
      } catch (e) {
        console.error("Failed to parse saved chat:", e);
      }
    }
  }, [key, expirationMs]);

  /**
   * ✅ Persist messages to localStorage on each update
   *
   * - Preserves the original timestamp if one already exists
   * - Prevents constant overwriting with a new timestamp on every keystroke
   */
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

  /**
   * ✅ Return messages and setter
   *
   * - Allows consumers to control chat messages while keeping them in sync with storage
   */
  return [messages, setMessages] as const;
}
