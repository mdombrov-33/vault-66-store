"use client";

import { Button } from "../ui/button";
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
          className="fixed bottom-4 right-4 z-50"
        >
          <TerminalIcon className="mr-2" />
          Need Help?
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-4xl h-[60vh] flex flex-col sm:rounded-xl border border-primary bg-black text-primary">
        <DialogHeader>
          <DialogTitle>Wasteland Assistant</DialogTitle>
          <DialogDescription>
            How can I assist you? Ask me anything about our products, the Vault,
            or survival tips!
          </DialogDescription>
        </DialogHeader>

        {/* Placeholder for chat UI */}
        <div className="mt-4">Chat interface will be implemented here.</div>

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
