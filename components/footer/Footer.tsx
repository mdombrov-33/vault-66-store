import ChatLauncher from "@/components/ai-chat/ChatLauncher";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

function Footer() {
  return (
    <footer className="flex">
      <Button
        asChild
        className="fixed bottom-5 left-5 hidden 2xl:block"
        size={"icon"}
      >
        <Link href="https://github.com/mdombrov-33/vault-66-store">
          <GitHubLogoIcon />
          <span className="sr-only">Open GitHub repository</span>
        </Link>
      </Button>
      <ChatLauncher />
    </footer>
  );
}

export default Footer;
