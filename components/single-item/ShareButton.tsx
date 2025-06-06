"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LuShare2 } from "react-icons/lu";

import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

function ShareButton({ productId, name }: { productId: string; name: string }) {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const sharedLink = `${url}/items/${productId}`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="p-2">
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        sideOffset={10}
        className="flex items-center gap-x-2 justify-center w-full"
      >
        <TwitterShareButton url={sharedLink} title={name}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <TelegramShareButton url={sharedLink} title={name}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <FacebookShareButton url={sharedLink} title={name}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </PopoverContent>
    </Popover>
  );
}

export default ShareButton;
