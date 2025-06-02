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

function ChatLauncher() {
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
          <DialogTitle>Wasteland Assistant</DialogTitle>
          <DialogDescription>
            How can I assist you? Ask me anything about our products, the Vault,
            or survival tips!
          </DialogDescription>
        </DialogHeader>

        <ChatInterface />

        <DialogFooter className="mt-auto">
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ChatLauncher;
