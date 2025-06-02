import Link from "next/link";
import { Button } from "../ui/button";

function Logo() {
  return (
    <Button size="lg" asChild className="hidden sm:block">
      <Link href="/">
        <span className="uppercase">vault 66</span>
      </Link>
    </Button>
  );
}

export default Logo;
