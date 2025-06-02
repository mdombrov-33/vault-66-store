import { useLayoutEffect, useEffect, useRef } from "react";
import { Message } from "@/types/ai-chat";

const SCROLL_POS_KEY = "vault66-chat-scroll-position";

/**
 * Custom hook to manage auto-scroll behavior for a chat interface.
 *
 * Features:
 * - Restores the previous scroll position when reopening
 * - Automatically scrolls to the bottom on new bot messages (when not typing)
 * - Animates scroll during typing (e.g., with TypeAnimation)
 * - Saves scroll position on manual scroll (to persist across reloads)
 */
export function useAutoScroll(
  containerRef: React.RefObject<HTMLDivElement> | null,
  isTyping: boolean,
  messages: Message[],
  isInitialLoad: boolean
) {
  const hasRestoredRef = useRef(false); // prevents restoring scroll position more than once

  /**
   *   1. Restore scroll position on initial load
   *
   * - Only runs once when the chat is first rendered
   * - Reads the saved scrollTop value from localStorage
   * - Uses requestAnimationFrame to wait for layout/render to complete
   */
  useLayoutEffect(() => {
    if (!isInitialLoad || !containerRef?.current || hasRestoredRef.current)
      return;

    const el = containerRef.current;
    const saved = localStorage.getItem(SCROLL_POS_KEY);
    if (saved) {
      const savedScrollTop = parseInt(saved, 10);
      requestAnimationFrame(() => {
        el.scrollTo({ top: savedScrollTop, behavior: "auto" });
        hasRestoredRef.current = true; // mark that we’ve restored scroll already
      });
    }
  }, [isInitialLoad, messages.length]); // re-run if message count changes while loading

  /**
   *   2. Auto-scroll to bottom when a new message is added
   *
   * - Skips if we’re still in initial load or if typing is in progress
   * - Useful for snapping to new bot/user messages
   */
  useEffect(() => {
    if (!containerRef?.current || isInitialLoad || isTyping) return;

    const el = containerRef.current;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping, isInitialLoad]);

  /**
   *   3. Smooth scrolling while typing animation plays
   *
   * - Triggers interval-based scroll syncing every 100ms
   * - Keeps view locked to bottom while bot types response character-by-character
   * - Stops when typing ends
   */
  useEffect(() => {
    if (!containerRef?.current || isInitialLoad) return;

    const el = containerRef.current;
    const interval = setInterval(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, 100);

    // Stop scrolling when typing ends
    if (!isTyping) {
      clearInterval(interval);
    }

    // Clean up interval on unmount or when dependencies change
    return () => clearInterval(interval);
  }, [isTyping, isInitialLoad]);

  /**
   *   4. Save scroll position on user scroll
   *
   * - Runs only when not typing (to avoid conflicts with auto scroll)
   * - Persists scrollTop to localStorage so we can restore it later
   */
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
