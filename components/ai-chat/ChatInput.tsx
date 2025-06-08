import { ChatInputProps } from "@/types/ai-chat";
import { Textarea } from "@/components/ui/textarea";
import { useTypingSounds } from "../../hooks/useTypingSounds";

function ChatInput({
  input,
  setInput,
  isLoading,
  isTyping,
  onSend,
}: ChatInputProps) {
  const { playTypingSound, playEnterSound, playSpacebarSound } =
    useTypingSounds();

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
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            playEnterSound();
            onSend();
          } else if (e.key === " ") {
            playSpacebarSound();
          }
        }}
        disabled={isLoading || isTyping}
      />
    </div>
  );
}

export default ChatInput;
