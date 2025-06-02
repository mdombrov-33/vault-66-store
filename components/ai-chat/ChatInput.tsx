import { ChatInputProps } from "@/types/ai-chat";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
        className="flex-1 resize-none"
        rows={2}
        placeholder="Type your question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && !e.shiftKey && (e.preventDefault(), onSend())
        }
        disabled={isLoading || isTyping}
      />
      <Button onClick={onSend} disabled={isLoading || isTyping}>
        Send
      </Button>
    </div>
  );
}

export default ChatInput;
