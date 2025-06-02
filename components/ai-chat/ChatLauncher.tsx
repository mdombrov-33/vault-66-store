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

//* Define the expiration time for chat messages in localStorage
const EXPIRATION_MS = 1000 * 60 * 60; // 1 hour

function ChatLauncher() {
  const [messages, setMessages] = useChatStorage("vault66-chat", EXPIRATION_MS);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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
          size="default"
          className="fixed bottom-4 right-4 z-50 flex items-center"
        >
          <TerminalIcon className="mr-2" />
          <span className="hidden md:inline">Need Help?</span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-full max-w-[90vw] sm:max-w-4xl h-[60vh] flex flex-col sm:rounded-xl border
        border-primary bg-black text-primary px-4 sm:px-8 mx-auto"
      >
        <DialogHeader>
          <DialogTitle>Vault Assistant</DialogTitle>
          <DialogDescription>
            How can I assist you? Ask me anything about our products, the Vault,
            or survival tips!
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
            <Button variant="secondary">Close</Button>
          </DialogClose>
          <Button onClick={handleSend} disabled={isLoading || isTyping}>
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ChatLauncher;
