import { Button } from "@/components/ui/button";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center  text-center p-8">
      <h1 className="text-4xl font-bold mb-4">404 – Page Not Found</h1>
      <p className="text-lg mb-6">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Button asChild variant="default">
        <Link href="/" className="hover:underline">
          Go back home
        </Link>
      </Button>
    </div>
  );
}

export default NotFound;
