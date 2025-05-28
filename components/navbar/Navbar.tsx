import Container from "../global/Container";
import CartBtn from "./CartBtn";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
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
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
