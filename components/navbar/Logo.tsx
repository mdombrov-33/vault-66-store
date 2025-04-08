import Link from "next/link";
import { IoLogoOctocat } from "react-icons/io5";
import { Button } from "../ui/button";

function Logo() {
  return (
    <Button size="icon" asChild>
      <Link href="/">
        <IoLogoOctocat className="w-6 h-6" />
      </Link>
    </Button>
  );
}

export default Logo;
