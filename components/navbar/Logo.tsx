import Link from "next/link";
import { Button } from "../ui/button";

function Logo() {
  return (
    <Button
      size="lg"
      asChild
      className="hidden sm:flex sm:items-center sm:justify-center"
    >
      <Link href="/">
        <span className="uppercase text-3xl">vault 66</span>
      </Link>
    </Button>
  );
}

export default Logo;
