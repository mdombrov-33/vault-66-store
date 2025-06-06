import { ChatInputProps } from "@/types/ai-chat";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";

const typingSounds = [
  "/sounds/typing1.wav",
  "/sounds/typing2.wav",
  "/sounds/typing3.wav",
  "/sounds/typing4.wav",
  "/sounds/typing5.wav",
  "/sounds/typing6.wav",
];

function ChatInput({
  input,
  setInput,
  isLoading,
  isTyping,
  onSend,
}: ChatInputProps) {
  const soundIndex = useRef(0);

  function playTypingSound() {
    const audio = new Audio(typingSounds[soundIndex.current]);
    audio.volume = 0.4;
    audio.play();

    soundIndex.current = (soundIndex.current + 1) % typingSounds.length;
  }

  return (
    <div className="mt-4 flex items-center gap-2">
      <Textarea
        className="flex-1 resize-none text-2xl"
        rows={2}
        placeholder="Awaiting command input..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          playTypingSound();
        }}
        onKeyDown={(e) =>
          e.key === "Enter" && !e.shiftKey && (e.preventDefault(), onSend())
        }
        disabled={isLoading || isTyping}
      />
    </div>
  );
}

export default ChatInput;
