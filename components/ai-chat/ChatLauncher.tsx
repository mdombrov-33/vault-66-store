"use client";

import { Button } from "@/components/ui/button";
import ChatInterface from "@/components/ai-chat/ChatInterface";
import { TerminalIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useChatStorage } from "./hooks/useChatStorage";
import { useState } from "react";
import { sendMessage } from "./send-message";
import { useSoundPlayer } from "@/hooks/useSoundPlayer";

//* Define the expiration time for chat messages in localStorage
const EXPIRATION_MS = 1000 * 60 * 60; // 1 hour

function ChatLauncher() {
  const [messages, setMessages] = useChatStorage("vault66-chat", EXPIRATION_MS);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { playClick } = useSoundPlayer();

  async function handleSend(): Promise<void> {
    await sendMessage({
      input,
      setInput,
      messages,
      setMessages,
      setIsLoading,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="lg"
          className="fixed bottom-8 right-6 z-50 p-3 rounded-full sm:p-4"
        >
          <TerminalIcon className="w-6 h-6" />
          <span className="hidden xl:inline text-3xl">Need Help?</span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-full max-w-[90vw] sm:max-w-4xl h-[60dvh] sm:h-[60vh] flex flex-col sm:rounded-xl border
        border-primary bg-black text-primary px-4 sm:px-8 mx-auto focus:outline-none"
      >
        <DialogHeader>
          <DialogTitle className="text-3xl">Vault Assistant</DialogTitle>
          <DialogDescription className="text-muted-foreground text-2xl">
            How can I assist you? Ask me anything about our gear, the Vault, or
            survival tips!
          </DialogDescription>
        </DialogHeader>

        <ChatInterface
          messages={messages}
          setMessages={setMessages}
          isLoading={isLoading}
          input={input}
          setInput={setInput}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
          handleSend={handleSend}
        />

        <DialogFooter className="mt-auto">
          <DialogClose asChild>
            <Button variant="ghost" className="text-2xl">
              Close
            </Button>
          </DialogClose>
          <Button
            className="text-3xl"
            onClick={() => {
              playClick();
              handleSend();
            }}
            disabled={isLoading || isTyping}
          >
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ChatLauncher;
