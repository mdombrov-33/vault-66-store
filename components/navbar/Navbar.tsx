import Container from '@/components/global/Container'
import CartBtn from '@/components/navbar/CartBtn'
import DarkMode from '@/components/navbar/DarkMode'
import LinksDropdown from '@/components/navbar/LinksDropdown'
import Logo from '@/components/navbar/Logo'
import NavSearch from '@/components/navbar/NavSearch'
import RadioBtn from '@/components/navbar/RadioBtn'
import CrtMode from '@/components/navbar/CrtMode'
import { Suspense } from 'react'

function Navbar() {
  return (
    <nav className="border-b">
      <Container className="flex flex-col items-center text-center sm:flex-row sm:justify-between sm:items-center sm:text-left flex-wrap py-8 gap-y-6 sm:gap-y-6 gap-x-4">
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
          <CrtMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  )
}

export default Navbar
