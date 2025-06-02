import { useLayoutEffect, useEffect, useRef } from "react";
import { Message } from "@/types/ai-chat";

const SCROLL_POS_KEY = "vault66-chat-scroll-position";

export function useAutoScroll(
  containerRef: React.RefObject<HTMLDivElement> | null,
  isTyping: boolean,
  messages: Message[],
  isInitialLoad: boolean
) {
  const hasRestoredRef = useRef(false);

  // ✅ 1. Restore scroll position once on initial load
  useLayoutEffect(() => {
    if (!isInitialLoad || !containerRef?.current || hasRestoredRef.current)
      return;

    const el = containerRef.current;
    const saved = localStorage.getItem(SCROLL_POS_KEY);
    if (saved) {
      const savedScrollTop = parseInt(saved, 10);
      requestAnimationFrame(() => {
        el.scrollTo({ top: savedScrollTop, behavior: "auto" });
        hasRestoredRef.current = true;
      });
    }
  }, [isInitialLoad, messages.length]);

  // ✅ 2. Scroll to bottom on new message (but not during initial load or typing)
  useEffect(() => {
    if (!containerRef?.current || isInitialLoad || isTyping) return;

    const el = containerRef.current;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping, isInitialLoad]);

  // ✅ 3. Scroll during typing animation
  useEffect(() => {
    if (!containerRef?.current || isInitialLoad) return;

    const el = containerRef.current;
    const interval = setInterval(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, 100); // repeat every 100ms while typing

    if (!isTyping) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isTyping, isInitialLoad]);

  // ✅ 4. Save scroll position as user scrolls
  useEffect(() => {
    if (!containerRef?.current || isTyping) return;

    const el = containerRef.current;
    const handleScroll = () => {
      localStorage.setItem(SCROLL_POS_KEY, el.scrollTop.toString());
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [isTyping, containerRef]);
}
