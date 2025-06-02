import { Button } from "../ui/button";
import { TerminalIcon } from "lucide-react";

function ChatLauncher() {
  return (
    <Button
      variant="default"
      size="default"
      className="fixed bottom-4 right-4 z-50"
    >
      <TerminalIcon className="mr-2" />
      Launch Chat
    </Button>
  );
}

export default ChatLauncher;
