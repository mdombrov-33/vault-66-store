import Container from "@/components/global/Container";
import CartBtn from "@/components/navbar/CartBtn";
import DarkMode from "@/components/navbar/DarkMode";
import LinksDropdown from "@/components/navbar/LinksDropdown";
import Logo from "@/components/navbar/Logo";
import NavSearch from "@/components/navbar/NavSearch";
import RadioBtn from "@/components/navbar/RadioBtn";
import { Suspense } from "react";

function Navbar() {
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8 gap-4">
        <Logo />
        {/* Use suspense here because of searchParams error.
         If we use searchParams with static pages we won't be able to deploy project at all. 
         https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
        <Suspense>
          <NavSearch />
        </Suspense>
        <div className="flex gap-4 items-center">
          <CartBtn />
          <DarkMode />
          <RadioBtn />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
