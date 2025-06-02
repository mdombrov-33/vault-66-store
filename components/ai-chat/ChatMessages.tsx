import { ChatWindowProps } from "@/types/ai-chat";
import { TypeAnimation } from "react-type-animation";

function ChatMessages({
  messages,
  setMessages,
  setIsTyping,
  messagesContainerRef,
}: ChatWindowProps) {
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
    </section>
  );
}

export default ChatMessages;
