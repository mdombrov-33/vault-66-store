import { ChatInputProps } from "@/types/ai-chat";
import { Textarea } from "@/components/ui/textarea";

function ChatInput({
  input,
  setInput,
  isLoading,
  isTyping,
  onSend,
}: ChatInputProps) {
  return (
    <div className="mt-4 flex items-center gap-2">
      <Textarea
        className="flex-1 resize-none text-2xl"
        rows={2}
        placeholder="Awaiting command input..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && !e.shiftKey && (e.preventDefault(), onSend())
        }
        disabled={isLoading || isTyping}
      />
    </div>
  );
}

export default ChatInput;
